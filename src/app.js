import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class App {
    constructor(eventAggregator) {
        this.eventAggregator = eventAggregator;

        this.selectedChannel = null;
    }

    // configureRouter(config, router) {
    //   this.router = router;
    //   config.title = 'Softdocs Slack Export';
    //   config.map([
    //     {
    //       route: ['', '*details'],
    //       name: 'Central',
    //       title: i18n.tr('Routes.Central.Home'),
    //       moduleId: 'home/home',
    //       nav: false
    //     }
    //   ]);
    // }

}
