import _ from "lodash";
import mitt from "mitt";
import React from "react";
import { reactInject } from "./ReactInject";
import { protocultureSymbols } from "protoculture";


export interface UsesEventBus {
    eventBus: mitt.Emitter
}

export function withEventBus<Props extends UsesEventBus>(componentType: React.ComponentType<Props>): React.ComponentType<Props> {

    return reactInject(protocultureSymbols.EventBus, componentType);
}
