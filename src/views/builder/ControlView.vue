<template>
    <div :class="[control.containerClass, 'control-view-wrapper', control.additionalContainerClass]">

        <div class="control-view" :class="{'active': isActive, 'text-center': control.isCenter}">
            <ControlLabel v-show="control.isShowLabel" :control="control" />

            <component :is="controlComponent"
                       :control="control"
            />

        </div>

        <ControlOption
            @delete="deleteControl"
            @config="openConfiguration"
            :permissions="permissions"
        />
    </div>
</template>

<script>
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import ControlLabel from "@/views/builder/control-views/ControlLabel";
    import {CONTROLS} from "@/configs/controls";
    import ControlOption from "@/views/builder/control-views/ControlOption";
    import {EVENT_CONSTANTS} from "@/configs/events";
    import SidebarRenderer from "@/libraries/sidebar-renderer.class";
    import SidebarControlConfiguration from "@/views/builder/sidebar-config-views/SidebarControlConfiguration";

    export default {
        name: "ControlView",
        components: {ControlOption, ControlLabel},
        mixins: [STYLE_INJECTION_MIXIN],
        props: {
            control: {
                type: Object,
                required: true
            },
            parentId: {
                type: String,
                required: true,
            },
            permissions: Object
        },

        data: () => ({
            isActive: false
        }),

        methods: {
            deleteControl() {
                this.$formEvent.$emit(
                    EVENT_CONSTANTS.BUILDER.CONTROL.DELETE,
                    this.parentId,
                    this.control.uniqueId
                )
            },

            openConfiguration() {
                if (this.isActive) {
                    return
                }

                this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPEN, this.control.uniqueId)
            },

            openedConfiguration(runnerId) {
                if (runnerId !== this.control.uniqueId) {
                    return
                }

                this.isActive = true
                this.renderSidebar()
            },

            renderSidebar() {
                this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.INJECT, new SidebarRenderer(
                    this.control.uniqueId,
                    SidebarControlConfiguration,
                    this.control
                ));
            },

            closedConfiguration() {
                this.isActive = false
            },

            saveConfiguration(runnerId, controlData) {
                this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.CONTROL.UPDATE, runnerId, controlData)
            }
        },

        computed: {
            controlComponent() {
                if (!CONTROLS[this.control.type] || !CONTROLS[this.control.type].fieldComponent) {
                    throw new TypeError(`Control Type Mapping failed => Can't be rendered. Reason: Your control type ${this.control.type} doesn't have 'fieldComponent' property`)
                }

                return CONTROLS[this.control.type].fieldComponent
            }
        },

        created() {
            this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE, this.saveConfiguration)
            this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE_AND_CLOSE, this.saveConfiguration)
            this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.AFTER_CLOSED, this.closedConfiguration)
            this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPENED, this.openedConfiguration)
        },
    }
</script>
