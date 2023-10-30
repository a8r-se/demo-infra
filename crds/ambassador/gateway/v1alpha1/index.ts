// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "../../utilities";

// Export members:
export { WebApplicationFirewallArgs } from "./webApplicationFirewall";
export type WebApplicationFirewall = import("./webApplicationFirewall").WebApplicationFirewall;
export const WebApplicationFirewall: typeof import("./webApplicationFirewall").WebApplicationFirewall = null as any;
utilities.lazyLoad(exports, ["WebApplicationFirewall"], () => require("./webApplicationFirewall"));

export { WebApplicationFirewallPolicyArgs } from "./webApplicationFirewallPolicy";
export type WebApplicationFirewallPolicy = import("./webApplicationFirewallPolicy").WebApplicationFirewallPolicy;
export const WebApplicationFirewallPolicy: typeof import("./webApplicationFirewallPolicy").WebApplicationFirewallPolicy = null as any;
utilities.lazyLoad(exports, ["WebApplicationFirewallPolicy"], () => require("./webApplicationFirewallPolicy"));


const _module = {
    version: utilities.getVersion(),
    construct: (name: string, type: string, urn: string): pulumi.Resource => {
        switch (type) {
            case "kubernetes:gateway.getambassador.io/v1alpha1:WebApplicationFirewall":
                return new WebApplicationFirewall(name, <any>undefined, { urn })
            case "kubernetes:gateway.getambassador.io/v1alpha1:WebApplicationFirewallPolicy":
                return new WebApplicationFirewallPolicy(name, <any>undefined, { urn })
            default:
                throw new Error(`unknown resource type ${type}`);
        }
    },
};
pulumi.runtime.registerResourceModule("crds", "gateway.getambassador.io/v1alpha1", _module)
