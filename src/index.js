import {VueFormBuilderInstaller} from "@/installer";
import FormBuilder from "@/components/FormBuilder";
import FormRenderer from "@/components/FormRenderer";
import BaseControlSkeleton from "@/skeletons/controls/BaseControlSkeleton";
import BaseControlConfigSkeleton from "@/skeletons/controls/BaseControlConfigSkeleton";

import '@/assets/v-form-builder.css'

const VueFormBuilderPlugin = {
    install: VueFormBuilderInstaller
};

if (typeof window !== 'undefined') {
    window.VueFormBuilderPlugin = VueFormBuilderPlugin
} else if (typeof global !== 'undefined') {
    global.VueFormBuilderPlugin = VueFormBuilderPlugin
}

export {
    VueFormBuilderPlugin,

    FormBuilder,
    FormRenderer,

    BaseControlSkeleton,
    BaseControlConfigSkeleton
}
