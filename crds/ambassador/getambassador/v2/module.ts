// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "../../utilities";

import {ObjectMeta} from "../../meta/v1";

/**
 * A Module defines system-wide configuration.  The type of module is controlled by the .metadata.name; valid names are "ambassador" or "tls".
 *  https://www.getambassador.io/docs/edge-stack/latest/topics/running/ambassador/#the-ambassador-module https://www.getambassador.io/docs/edge-stack/latest/topics/running/tls/#tls-module-deprecated
 */
export class Module extends pulumi.CustomResource {
    /**
     * Get an existing Module resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): Module {
        return new Module(name, undefined as any, { ...opts, id: id });
    }

    /** @internal */
    public static readonly __pulumiType = 'kubernetes:getambassador.io/v2:Module';

    /**
     * Returns true if the given object is an instance of Module.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is Module {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === Module.__pulumiType;
    }

    public readonly apiVersion!: pulumi.Output<"getambassador.io/v2" | undefined>;
    public readonly kind!: pulumi.Output<"Module" | undefined>;
    public readonly metadata!: pulumi.Output<ObjectMeta | undefined>;
    public readonly spec!: pulumi.Output<{[key: string]: any} | undefined>;

    /**
     * Create a Module resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: ModuleArgs, opts?: pulumi.CustomResourceOptions) {
        let resourceInputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            resourceInputs["apiVersion"] = "getambassador.io/v2";
            resourceInputs["kind"] = "Module";
            resourceInputs["metadata"] = args ? args.metadata : undefined;
            resourceInputs["spec"] = args ? args.spec : undefined;
        } else {
            resourceInputs["apiVersion"] = undefined /*out*/;
            resourceInputs["kind"] = undefined /*out*/;
            resourceInputs["metadata"] = undefined /*out*/;
            resourceInputs["spec"] = undefined /*out*/;
        }
        opts = pulumi.mergeOptions(utilities.resourceOptsDefaults(), opts);
        super(Module.__pulumiType, name, resourceInputs, opts);
    }
}

/**
 * The set of arguments for constructing a Module resource.
 */
export interface ModuleArgs {
    apiVersion?: pulumi.Input<"getambassador.io/v2">;
    kind?: pulumi.Input<"Module">;
    metadata?: pulumi.Input<ObjectMeta>;
    spec?: pulumi.Input<{[key: string]: any}>;
}
