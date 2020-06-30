import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { User } from '../entities/user.entity';

export class SessionGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest();
        /*if (request.headers.host.indexOf('localhost') > -1 && !request.session.user){
            request.session.user = { "created": "2016-12-08T12:47:22.000Z", "lastUpdated": "2019-11-13T06:22:07.000Z", "id": 937, "uid": "5849565a0256c", "username": "anonymous", "firstName": "Anonymous", "middleName": null, "surname": "Anonymous", "email": "anonymous@example.com", "phoneNumber": null, "jobTitle": null, "lastLogin": "2019-11-13T06:22:07.000Z", "expiryDate": null, "deletedDate": null, "enabled": true, "token": "dmluY2VudG1pbmRlOkhSSElTMjAyMA==", "userRoles": [{"landingPage":""}], "userGroups": [], "messages": [], "forms": [], "organisationUnits": [
                {
                  "id": "52893cd1b8359"
                }
              ], "userSettings": null };
            return true;
        }*/
        //return true;
        // console.log(request.headers)
        try {
            if (request.session && request.session.user) {
                request.session.previousPath = request.path;
                return true;
            }
            if (request.headers['authorization']) {
                let buff = Buffer.from(request.headers['authorization'].replace('Basic ', ''), 'base64');
                let auth = buff.toString('ascii').split(':');
                let user = await User.authenticateUser(auth[0], auth[1]);
                if (user) {
                    if(!request.session){
                        request.session = {};
                    }
                    request.session.user = user;
                    return true;
                }
            }
        } catch (e) {
            Logger.error("Message");
            Logger.error(e.message);
            throw new Error('Not In Session');
        }
    }
}
export const SessionUser = createParamDecorator((data, req) => {
    return req.session.passport.user;
})