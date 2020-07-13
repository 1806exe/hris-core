import { Get, Controller, Render, Req, Res, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { genericFailureResponse } from './core/helpers/response.helper';

@Controller()
export class AppController {

  /**
   *
   * @param appService
   */
  constructor(private readonly appService: AppService) {}

  /**
   *
   * @param request
   * @param response
   */

  @Get()
  async index(@Req() request, @Res() response) {
    let app;
    console.log("request.session:",request.session);
    if (request.session && request.session.user) {
      app = request.session.user.userRoles[0].landingPage;
      if(!app){
        app = await this.appService.getDefaultLoginApp();
      }
      console.log('App:', app);
    } else {
      app = await this.appService.getLoginApp();
    }
    console.log(app);
    if(app){
      response.redirect('/api/apps/' + app.name.toLowerCase().split(' ').join('') + '/' + app.launchpath);
    }else{
      return response.status(500).json({
        message: `Apps not uploaded.`,
      });
    }
  }
}
