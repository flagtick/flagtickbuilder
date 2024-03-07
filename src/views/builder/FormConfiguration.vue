<template>
    <div class="form-configuration-block">
        <button
            :class="styles.BUTTON.INFO"
            @click="open"
            :disabled="!permissions.canEditFormConfigurations">
            <span v-html="$form.getIcon('cog')"></span>
            <span>Layout Configurations</span>
        </button>
    </div>
</template>

<script>
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import {EVENT_CONSTANTS} from "@/configs/events";
    import SidebarRenderer from "@/libraries/sidebar-renderer.class";
    import SidebarFormConfiguration from "@/views/builder/sidebar-config-views/SidebarFormConfiguration";

    const RUNNER_ID = 'FormConfiguration'

    export default {
        name: "FormConfiguration",
        components: {SidebarFormConfiguration},
        mixins: [STYLE_INJECTION_MIXIN],
        props: {
            value: Object,
            permissions: Object
        },
        model: {
            event: 'change',
            props: 'value'
        },
        methods: {
            open() {
                this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPEN, RUNNER_ID)
            },

            renderSidebar() {
                this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.INJECT, new SidebarRenderer(
                    RUNNER_ID,
                    SidebarFormConfiguration,
                    this.value
                ));
            },

            saveConfiguration(runnerId, data) {
                if (runnerId !== RUNNER_ID) {
                    return
                }

                let newValue = Object.assign({}, this.value, data)
                this.$emit('change', newValue)
            },

            afterOpenedSidebar(runnerId) {
                if (runnerId !== RUNNER_ID) {
                    return
                }

                this.renderSidebar()
            },
        },

        created() {
            this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE, this.saveConfiguration);
            this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE_AND_CLOSE, this.saveConfiguration);
            this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPENED, this.renderSidebar)
        }
    }
</script>
