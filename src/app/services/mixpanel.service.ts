import { Injectable } from '@angular/core';
import * as mixpanel from 'mixpanel-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MixpanelService {

  constructor() { }

   /**
 * Initialize mixpanel.
 *
 * @param {string} userToken
 * @memberof MixpanelService
 */
    init(): void {
      mixpanel.init(environment.mixpanelProjectID, {batch_requests: true, debug: environment.mixpanelDebug});
      this.timeEvent('click early access button');
    }

    /**
   * Identify mixpanel user profile
   *
   * @param {string} userToken
   * @memberof MixpanelService
   */
    private identify(userToken: string): void {
      console.log('user identified');
      mixpanel.identify(userToken);
    }

    /**
   * Create user profile alias to combine UID to mixpanel UUID
   *
   * @param {string} uid
   * @memberof MixpanelService
   */
    private alias(uid: string): void {
      mixpanel.alias(uid);
    }

    /**
     * Push new action to mixpanel.
     *
     * @param {string} id Name of the action to track.
     * @param {*} [action={}] Actions object with custom properties.
     * @memberof MixpanelService
     */
    private track(id: string, action: any = {}): void {
      mixpanel.track(id, action);
    }

    /**
     * Time event between this call and track
     *
     * @param {string} id Name of the action to track.
     * @memberof MixpanelService
     */
    private timeEvent(id: string): void {
      mixpanel.time_event(id);
    }

    /**
     * Clears super properties and generates a new random distinct_id
     *
     * @memberof MixpanelService
     */
    private reset(): void {
      mixpanel.reset();
    }

    /**
   * Increments property for user
   *
   *
   * @memberof MixpanelService
   */
    private increment(property: string, counter = 1): void {
      mixpanel.people.increment(property, counter);
    }

   /**
   * Set property of user
   *
   * @param {string} name Name of the property.
   * @param {string} property Information of the property.
   *
   * @memberof MixpanelService
   */
    private setProperty(name: string, property: any) {
      mixpanel.people.set(name, property);
    }

    signIn(uid: string, newUser: boolean) {
      newUser ? this.alias(uid) : this.identify(uid);
      this.track('sign in');
    }

    earlyAccess(action: any = {}) {
      this.track('early access sign up', action);
      for (const property in action) this.setProperty('$' + property, action[property]);
     }

    goToEarlyAccess(action: any = {}) {
      this.track('click early access button', action);
      this.timeEvent('early access sign up');
    }

    clickInstagram(action: any = {}) {
      this.track('click instagram link', action);
    }

    clickEmail(action: any = {}) {
      this.track('click email link', action);
    }

}
