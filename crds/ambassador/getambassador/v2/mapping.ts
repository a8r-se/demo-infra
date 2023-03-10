// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as inputs from "../../types/input";
import * as outputs from "../../types/output";
import * as utilities from "../../utilities";

import {ObjectMeta} from "../../meta/v1";

/**
 * Mapping is the Schema for the mappings API
 */
export class Mapping extends pulumi.CustomResource {
    /**
     * Get an existing Mapping resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): Mapping {
        return new Mapping(name, undefined as any, { ...opts, id: id });
    }

    /** @internal */
    public static readonly __pulumiType = 'kubernetes:getambassador.io/v2:Mapping';

    /**
     * Returns true if the given object is an instance of Mapping.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is Mapping {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === Mapping.__pulumiType;
    }

    public readonly apiVersion!: pulumi.Output<"getambassador.io/v2" | undefined>;
    public readonly kind!: pulumi.Output<"Mapping" | undefined>;
    public readonly metadata!: pulumi.Output<ObjectMeta | undefined>;
    /**
     * MappingSpec defines the desired state of Mapping
     */
    public readonly spec!: pulumi.Output<{[key: string]: any} | undefined>;
    /**
     * MappingStatus defines the observed state of Mapping
     */
    public readonly status!: pulumi.Output<outputs.getambassador.v2.MappingStatus | undefined>;

    /**
     * Create a Mapping resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: MappingArgs, opts?: pulumi.CustomResourceOptions) {
        let resourceInputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            resourceInputs["apiVersion"] = "getambassador.io/v2";
            resourceInputs["kind"] = "Mapping";
            resourceInputs["metadata"] = args ? args.metadata : undefined;
            resourceInputs["spec"] = args ? args.spec : undefined;
            resourceInputs["status"] = args ? args.status : undefined;
        } else {
            resourceInputs["apiVersion"] = undefined /*out*/;
            resourceInputs["kind"] = undefined /*out*/;
            resourceInputs["metadata"] = undefined /*out*/;
            resourceInputs["spec"] = undefined /*out*/;
            resourceInputs["status"] = undefined /*out*/;
        }
        opts = pulumi.mergeOptions(utilities.resourceOptsDefaults(), opts);
        super(Mapping.__pulumiType, name, resourceInputs, opts);
    }
}

/**
 * The set of arguments for constructing a Mapping resource.
 */
export interface MappingArgs {
    apiVersion?: pulumi.Input<"getambassador.io/v2">;
    kind?: pulumi.Input<"Mapping">;
    metadata?: pulumi.Input<ObjectMeta>;
    /**
     * MappingSpec defines the desired state of Mapping
     */
    spec?: pulumi.Input<{[key: string]: any}>;
    /**
     * MappingStatus defines the observed state of Mapping
     */
    status?: pulumi.Input<inputs.getambassador.v2.MappingStatusArgs>;
}
