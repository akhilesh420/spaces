import { MixpanelService } from 'src/app/services/mixpanel.service';
import { Injectable } from '@angular/core';
import { templates, ab_version } from '../extras/AB-test-data';


@Injectable({
  providedIn: 'root'
})
export class ABTestService {

  constructor(private mixpanelService: MixpanelService) { }

  getTemplate() {
    var template: string = localStorage.getItem('template');
    var version = localStorage.getItem('ab_version');
    if (!template || !version || +version != ab_version) template = this.setTemplate();
    return template;
  }

  private setTemplate() {
    const length = templates.length;
    if (length === 0 || !length) return 'A';
    const template = templates[this.pdf(length)];
    localStorage.setItem('template', template);
    const version: string = ab_version.toString();
    localStorage.setItem('ab_version', version);
    this.mixpanelService.setUserProperty('AB-' + version, template);
    this.mixpanelService.setABtemplate({template: template, version: version});
    return template;
  }

  private pdf(max: number) {
    return Math.floor(Math.random() * max);
  }
}
