import { BaseController } from '../../../core/controllers/base.contoller';
import { App } from '../entities/apps.entity';
import { AppService } from '../services/apps.service';
import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { getConfiguration } from 'src/core/utilities/configuration';
import * as fs from 'fs';
import * as StreamZip from 'node-stream-zip';
import { ApiResult } from 'src/core/interfaces';

console.log('Plural:', App.plural);
@Controller('api/' + App.plural)
export class AppsController extends BaseController<App> {
    constructor(private service: AppService) {
        super(service, App);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: getConfiguration().temp
            , filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, randomName + '.app.zip')
            }
        })
    }))
    async upload(@UploadedFile() file): Promise<ApiResult>{
        try {
            let result = await this.uploadFile(file);
            return super.create(result);
        }catch(e){
            return e;
        }
    }

    uploadFile(file){
        return new Promise((resolve, reject) => {
            const zip = new StreamZip({
                file: file.path,
                storeEntries: true
            });
            zip.on('ready', () => {
                let found = false;
                Object.values(zip.entries()).forEach((entry: any) => {
                    if (entry.name === 'manifest.webapp') {
                        found = true;
                    }
                })
                if (!found){
                    reject({
                        'error': 'No Manifest File Found'
                    });
                    zip.close();
                } else {
                    zip.stream('manifest.webapp', (err, stream) => {
                        const chunks = [];;
                        stream.on('data', function (chunk) {
                            chunks.push(chunk);
                        });
                        stream.on('end', () => {
                            let manifest = JSON.parse(Buffer.concat(chunks).toString());
                            let destination = getConfiguration().apps + '/' + manifest.name;
                            if (!fs.existsSync(destination)) {
                                fs.mkdirSync(destination);
                            }
                            zip.extract(null, getConfiguration().apps + '/' + manifest.name, (err, count) => {
                                zip.close();
                                resolve({
                                    name: manifest.name,
                                    shortName: manifest.name,
                                    version: manifest.version,
                                    launchpath: manifest.launch_path,
                                    appicon: manifest.icons['16'] || manifest.icons['48'] || manifest.icons['128']
                                });
                            });
                        });
                    });
                }
            });
        });
    }

    @Get(':id/*')
    async loadFile(@Param() params, @Res() res) {
        const result = await this.service.findOneById(params.id);
        res.sendFile(getConfiguration().apps + '/' + result.name + '/' + params['0']);
    }

}