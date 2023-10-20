// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as inputs from "../../types/input";
import * as outputs from "../../types/output";
import * as utilities from "../../utilities";

import {ObjectMeta} from "../../meta/v1";

export class InterceptSpecification extends pulumi.CustomResource {
    /**
     * Get an existing InterceptSpecification resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): InterceptSpecification {
        return new InterceptSpecification(name, undefined as any, { ...opts, id: id });
    }

    /** @internal */
    public static readonly __pulumiType = 'kubernetes:getambassador.io/v1alpha3:InterceptSpecification';

    /**
     * Returns true if the given object is an instance of InterceptSpecification.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is InterceptSpecification {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === InterceptSpecification.__pulumiType;
    }

    public readonly apiVersion!: pulumi.Output<"getambassador.io/v1alpha3" | undefined>;
    public readonly kind!: pulumi.Output<"InterceptSpecification" | undefined>;
    public readonly metadata!: pulumi.Output<ObjectMeta | undefined>;
    /**
     * The Intercept Specification defines Telepresence intercepts.
     */
    public readonly spec!: pulumi.Output<outputs.getambassador.v1alpha3.InterceptSpecificationSpec | undefined>;

    /**
     * Create a InterceptSpecification resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: InterceptSpecificationArgs, opts?: pulumi.CustomResourceOptions) {
        let resourceInputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            resourceInputs["apiVersion"] = "getambassador.io/v1alpha3";
            resourceInputs["kind"] = "InterceptSpecification";
            resourceInputs["metadata"] = args ? args.metadata : undefined;
            resourceInputs["spec"] = args ? args.spec : undefined;
        } else {
            resourceInputs["apiVersion"] = undefined /*out*/;
            resourceInputs["kind"] = undefined /*out*/;
            resourceInputs["metadata"] = undefined /*out*/;
            resourceInputs["spec"] = undefined /*out*/;
        }
        opts = pulumi.mergeOptions(utilities.resourceOptsDefaults(), opts);
        super(InterceptSpecification.__pulumiType, name, resourceInputs, opts);
    }
}

/**
 * The set of arguments for constructing a InterceptSpecification resource.
 */
export interface InterceptSpecificationArgs {
    apiVersion?: pulumi.Input<"getambassador.io/v1alpha3">;
    kind?: pulumi.Input<"InterceptSpecification">;
    metadata?: pulumi.Input<ObjectMeta>;
    /**
     * The Intercept Specification defines Telepresence intercepts.
     */
    spec?: pulumi.Input<inputs.getambassador.v1alpha3.InterceptSpecificationSpecArgs>;
}