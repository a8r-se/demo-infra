// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "../../utilities";

import {ObjectMeta} from "../../meta/v1";

export class FilterPolicy extends pulumi.CustomResource {
    /**
     * Get an existing FilterPolicy resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): FilterPolicy {
        return new FilterPolicy(name, undefined as any, { ...opts, id: id });
    }

    /** @internal */
    public static readonly __pulumiType = 'kubernetes:getambassador.io/v1beta2:FilterPolicy';

    /**
     * Returns true if the given object is an instance of FilterPolicy.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is FilterPolicy {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === FilterPolicy.__pulumiType;
    }

    public readonly apiVersion!: pulumi.Output<"getambassador.io/v1beta2" | undefined>;
    public readonly kind!: pulumi.Output<"FilterPolicy" | undefined>;
    public readonly metadata!: pulumi.Output<ObjectMeta | undefined>;
    public readonly spec!: pulumi.Output<{[key: string]: any} | undefined>;

    /**
     * Create a FilterPolicy resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: FilterPolicyArgs, opts?: pulumi.CustomResourceOptions) {
        let resourceInputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            resourceInputs["apiVersion"] = "getambassador.io/v1beta2";
            resourceInputs["kind"] = "FilterPolicy";
            resourceInputs["metadata"] = args ? args.metadata : undefined;
            resourceInputs["spec"] = args ? args.spec : undefined;
        } else {
            resourceInputs["apiVersion"] = undefined /*out*/;
            resourceInputs["kind"] = undefined /*out*/;
            resourceInputs["metadata"] = undefined /*out*/;
            resourceInputs["spec"] = undefined /*out*/;
        }
        opts = pulumi.mergeOptions(utilities.resourceOptsDefaults(), opts);
        super(FilterPolicy.__pulumiType, name, resourceInputs, opts);
    }
}

/**
 * The set of arguments for constructing a FilterPolicy resource.
 */
export interface FilterPolicyArgs {
    apiVersion?: pulumi.Input<"getambassador.io/v1beta2">;
    kind?: pulumi.Input<"FilterPolicy">;
    metadata?: pulumi.Input<ObjectMeta>;
    spec?: pulumi.Input<{[key: string]: any}>;
}
