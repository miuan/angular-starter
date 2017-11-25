
// should be in enviroment of project
const API_SERVER_URL = 'localhost:5000';
const API_SERVER_MOCK = false;

export class ConfigService {
  private _token: string;
  private _refreshToken: string;

  public login(token, refreshToken) {
      this._token = token;
      this._refreshToken = refreshToken;
  }

  get token(){
    return this._token;
  }

  get refreshToken(){
    return this._refreshToken;
  }

  public get API_SERVER_URL(): string {

    // global variable from webpack
    // /confing/webpack.dev.js -> DefinePlugin
    return API_SERVER_URL;
  }

  public get API_SERVER_MOCK(): boolean {
    // global variable from webpack
    // /confing/webpack.dev.js -> DefinePlugin
    return API_SERVER_MOCK;
  }
}
