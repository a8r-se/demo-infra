// *** WARNING: this file was generated by crd2pulumi. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "../../utilities";

// Export members:
export { AuthServiceArgs } from "./authService";
export type AuthService = import("./authService").AuthService;
export const AuthService: typeof import("./authService").AuthService = null as any;
utilities.lazyLoad(exports, ["AuthService"], () => require("./authService"));

export { ConsulResolverArgs } from "./consulResolver";
export type ConsulResolver = import("./consulResolver").ConsulResolver;
export const ConsulResolver: typeof import("./consulResolver").ConsulResolver = null as any;
utilities.lazyLoad(exports, ["ConsulResolver"], () => require("./consulResolver"));

export { DevPortalArgs } from "./devPortal";
export type DevPortal = import("./devPortal").DevPortal;
export const DevPortal: typeof import("./devPortal").DevPortal = null as any;
utilities.lazyLoad(exports, ["DevPortal"], () => require("./devPortal"));

export { KubernetesEndpointResolverArgs } from "./kubernetesEndpointResolver";
export type KubernetesEndpointResolver = import("./kubernetesEndpointResolver").KubernetesEndpointResolver;
export const KubernetesEndpointResolver: typeof import("./kubernetesEndpointResolver").KubernetesEndpointResolver = null as any;
utilities.lazyLoad(exports, ["KubernetesEndpointResolver"], () => require("./kubernetesEndpointResolver"));

export { KubernetesServiceResolverArgs } from "./kubernetesServiceResolver";
export type KubernetesServiceResolver = import("./kubernetesServiceResolver").KubernetesServiceResolver;
export const KubernetesServiceResolver: typeof import("./kubernetesServiceResolver").KubernetesServiceResolver = null as any;
utilities.lazyLoad(exports, ["KubernetesServiceResolver"], () => require("./kubernetesServiceResolver"));

export { LogServiceArgs } from "./logService";
export type LogService = import("./logService").LogService;
export const LogService: typeof import("./logService").LogService = null as any;
utilities.lazyLoad(exports, ["LogService"], () => require("./logService"));

export { MappingArgs } from "./mapping";
export type Mapping = import("./mapping").Mapping;
export const Mapping: typeof import("./mapping").Mapping = null as any;
utilities.lazyLoad(exports, ["Mapping"], () => require("./mapping"));

export { ModuleArgs } from "./module";
export type Module = import("./module").Module;
export const Module: typeof import("./module").Module = null as any;
utilities.lazyLoad(exports, ["Module"], () => require("./module"));

export { RateLimitServiceArgs } from "./rateLimitService";
export type RateLimitService = import("./rateLimitService").RateLimitService;
export const RateLimitService: typeof import("./rateLimitService").RateLimitService = null as any;
utilities.lazyLoad(exports, ["RateLimitService"], () => require("./rateLimitService"));

export { TCPMappingArgs } from "./tcpmapping";
export type TCPMapping = import("./tcpmapping").TCPMapping;
export const TCPMapping: typeof import("./tcpmapping").TCPMapping = null as any;
utilities.lazyLoad(exports, ["TCPMapping"], () => require("./tcpmapping"));

export { TLSContextArgs } from "./tlscontext";
export type TLSContext = import("./tlscontext").TLSContext;
export const TLSContext: typeof import("./tlscontext").TLSContext = null as any;
utilities.lazyLoad(exports, ["TLSContext"], () => require("./tlscontext"));

export { TracingServiceArgs } from "./tracingService";
export type TracingService = import("./tracingService").TracingService;
export const TracingService: typeof import("./tracingService").TracingService = null as any;
utilities.lazyLoad(exports, ["TracingService"], () => require("./tracingService"));


const _module = {
    version: utilities.getVersion(),
    construct: (name: string, type: string, urn: string): pulumi.Resource => {
        switch (type) {
            case "kubernetes:getambassador.io/v1:AuthService":
                return new AuthService(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:ConsulResolver":
                return new ConsulResolver(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:DevPortal":
                return new DevPortal(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:KubernetesEndpointResolver":
                return new KubernetesEndpointResolver(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:KubernetesServiceResolver":
                return new KubernetesServiceResolver(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:LogService":
                return new LogService(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:Mapping":
                return new Mapping(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:Module":
                return new Module(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:RateLimitService":
                return new RateLimitService(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:TCPMapping":
                return new TCPMapping(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:TLSContext":
                return new TLSContext(name, <any>undefined, { urn })
            case "kubernetes:getambassador.io/v1:TracingService":
                return new TracingService(name, <any>undefined, { urn })
            default:
                throw new Error(`unknown resource type ${type}`);
        }
    },
};
pulumi.runtime.registerResourceModule("aescrds", "getambassador.io/v1", _module)
