import { createParamDecorator } from '@nestjs/common';

export const Token = createParamDecorator((data, req) => {
	return req.switchToHttp().getRequest().headers.authorization.split(' ')[1];
});
