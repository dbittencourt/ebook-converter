import * as Auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

class Auth { 
  private auth: Auth0.WebAuth;

  constructor() {
    this.auth = new Auth0.WebAuth({
      // the following three lines MUST be updated
      audience: AUTH_CONFIG.audience,
      clientID: AUTH_CONFIG.clientID,
      domain: AUTH_CONFIG.domain,
      redirectUri: AUTH_CONFIG.redirectUri,
      responseType: AUTH_CONFIG.responseType,
      scope: AUTH_CONFIG.scope
    });
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  public getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  public handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth.parseHash((err, authResult) => {
        if (err){
            return reject(err);
        } 
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }

        this.setSession(authResult);
        resolve();
      });
    })
  }

  public isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at')!);
    return new Date().getTime() < expiresAt;
  }

  public signIn() {
      this.auth.authorize();
  }

  public signOut() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    localStorage.removeItem('profile');
  }

  private setSession(authResult: any) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || '';

    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
    localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));
  }

  private getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  private getIdToken() {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      throw new Error('No id token found');
    }
    return idToken;
  }
}

const auth0 = new Auth();

export default auth0;