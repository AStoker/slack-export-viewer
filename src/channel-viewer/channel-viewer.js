import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class ChannelViewer {

    constructor() {

    }

    activate(channel) {
        console.log(channel);
    }
}
