// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "../../utilities";

import {ObjectMeta} from "../../meta/v1";

/**
 * DevPortal is the Schema for the DevPortals API
 *  DevPortal resources specify the `what` and `how` is shown in a DevPortal:
 *  1. `what` is in a DevPortal can be controlled with
 *  - a `selector`, that can be used for filtering `Mappings`.
 *  - a `docs` listing of (services, url)
 *  2. `how` is a pointer to some `contents` (a checkout of a Git repository with go-templates/markdown/css).
 *      Multiple `DevPortal`s can exist in the cluster, and the Dev Portal server will show them at different endpoints. A `DevPortal` resource with a special name, `ambassador`, will be used for configuring the default Dev Portal (served at `/docs/` by default).
 */
export class DevPortal extends pulumi.CustomResource {
    /**
     * Get an existing DevPortal resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    public static get(name: string, id: pulumi.Input<pulumi.ID>, opts?: pulumi.CustomResourceOptions): DevPortal {
        return new DevPortal(name, undefined as any, { ...opts, id: id });
    }

    /** @internal */
    public static readonly __pulumiType = 'kubernetes:getambassador.io/v2:DevPortal';

    /**
     * Returns true if the given object is an instance of DevPortal.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is DevPortal {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === DevPortal.__pulumiType;
    }

    public readonly apiVersion!: pulumi.Output<"getambassador.io/v2" | undefined>;
    public readonly kind!: pulumi.Output<"DevPortal" | undefined>;
    public readonly metadata!: pulumi.Output<ObjectMeta | undefined>;
    /**
     * DevPortalSpec defines the desired state of DevPortal
     */
    public readonly spec!: pulumi.Output<{[key: string]: any} | undefined>;

    /**
     * Create a DevPortal resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args?: DevPortalArgs, opts?: pulumi.CustomResourceOptions) {
        let resourceInputs: pulumi.Inputs = {};
        opts = opts || {};
        if (!opts.id) {
            resourceInputs["apiVersion"] = "getambassador.io/v2";
            resourceInputs["kind"] = "DevPortal";
            resourceInputs["metadata"] = args ? args.metadata : undefined;
            resourceInputs["spec"] = args ? args.spec : undefined;
        } else {
            resourceInputs["apiVersion"] = undefined /*out*/;
            resourceInputs["kind"] = undefined /*out*/;
            resourceInputs["metadata"] = undefined /*out*/;
            resourceInputs["spec"] = undefined /*out*/;
        }
        opts = pulumi.mergeOptions(utilities.resourceOptsDefaults(), opts);
        super(DevPortal.__pulumiType, name, resourceInputs, opts);
    }
}

/**
 * The set of arguments for constructing a DevPortal resource.
 */
export interface DevPortalArgs {
    apiVersion?: pulumi.Input<"getambassador.io/v2">;
    kind?: pulumi.Input<"DevPortal">;
    metadata?: pulumi.Input<ObjectMeta>;
    /**
     * DevPortalSpec defines the desired state of DevPortal
     */
    spec?: pulumi.Input<{[key: string]: any}>;
}
