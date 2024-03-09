<template>
    <div class="sidebar-builder">
        <span class="closeIcon"
              @click="close"
              v-html="$form.getIcon('close', '20px', '20px', '#FFF')">
        </span>

        <span class="fullIcon"
              @click="full"
              v-show="isGlobalView"
              v-html="$form.getIcon('full', '20px', '20px', '#FFF')">
        </span>

        <!--- For dynamic purpose --->
        <component v-if="component"

                   :is="component"
                   :dataPackage="dynamicData"
                   :formData="formData"
                   :permissions="permissions"

                   @save="save"
                   @saveAndClose="saveAndClose"
                   @close="close"
        />
    </div>
</template>

<script>
import {EVENT_CONSTANTS} from "@/configs/events";

const SIDEBAR_WIDTH_SIZE = "300px";
const SIDEBAR_FULL_SCREEN = "100%";

export default {
    name: "GlobalSidebar",
    props: {
        formData: {
            type: Object,
            default() {
                return {}
            }
        },
        permissions: Object
    },
    data: () => ({
        component: null,
        isGlobalView: true,
        dynamicData: {},
        runnerId: null,
        isOpen: false,
    }),
    methods: {
        /**
         * Open the Right Sidebar
         */
        open(runnerId) {
            if (this.isOpen) {
                return
            }

            const sidebarElement = document.querySelector('.sidebar-builder');
            const configElement = document.querySelector('.sidebar-form-configuration');

            const pattern = /^add-control-/;
            if (pattern.test(runnerId)) {
                sidebarElement.style.height = '80%';
                sidebarElement.style.width = '80%';
                sidebarElement.style.margin = '48px 10% 10% 10%';
                sidebarElement.style.position = 'fixed';
                sidebarElement.style.zIndex = '1111';
                sidebarElement.style.top = '0';
                sidebarElement.style.left = '0';
                sidebarElement.style.backgroundColor = '#0473aa';
                sidebarElement.style.display = 'flex';
                sidebarElement.style.alignItems = 'center';
                sidebarElement.style.justifyContent = 'center';
                sidebarElement.style.transition = '0.5s';
                sidebarElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
                this.isGlobalView = false;
            } else {
                this.$el.style.width = SIDEBAR_WIDTH_SIZE;
                this.$el.style.backgroundColor = '#0473aa';
                this.isGlobalView = true;
                document.getElementsByTagName("body")[0].style.marginRight = SIDEBAR_WIDTH_SIZE;
            }
            this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPENED, runnerId)
            this.isOpen = true
        },

        /**
         * Save - Emitting data to the listener but do not close the sidebar
         * @hook Emit Data to the Listener
         */
        save(specialData = {}) {
            this.$formEvent.$emit(
                EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE,
                this.runnerId,
                Object.assign({}, specialData)
            )
        },

        /**
         * Save event with close the right sidebar
         */
        saveAndClose(specialData = {}) {
            this.$formEvent.$emit(
                EVENT_CONSTANTS.BUILDER.SIDEBAR.SAVE_AND_CLOSE,
                this.runnerId,
                Object.assign({}, specialData)
            )

            this.close()
        },

        /**
         * Close the right sidebar
         * @hook After Closed - Fire an Event to notify (maybe someone will listen :v )
         */
        close() {
            const sidebarElement = document.querySelector('.sidebar-builder');
            sidebarElement.style.height = '';
            sidebarElement.style.width = '';
            sidebarElement.style.margin = '';
            sidebarElement.style.position = '';
            sidebarElement.style.zIndex = '';
            sidebarElement.style.top = '';
            sidebarElement.style.left = '';
            sidebarElement.style.backgroundColor = '';
            sidebarElement.style.display = '';
            sidebarElement.style.alignItems = '';
            sidebarElement.style.justifyContent = '';
            sidebarElement.style.transition = '';
            sidebarElement.style.boxShadow = '';

            const pattern = /^add-control-/;
            if (!pattern.test(this.runnerId)) {
                this.$el.style.width = 0;
                document.getElementsByTagName("body")[0].style.marginRight = 0;
            }

            this.$formEvent.$emit(
                EVENT_CONSTANTS.BUILDER.SIDEBAR.AFTER_CLOSED,
                this.runnerId,
                null
            )

            // remove renderer
            this.component = null
            this.dynamicData = {}
            this.runnerId = null
            this.isOpen = false
        },

        full() {
            // set size
            this.$el.style.width = SIDEBAR_FULL_SCREEN
            this.$el.style.zIndex = 112
        },

        /**
         * This method will help us inject our Component into the Sidebar Body
         * @param {SidebarRenderer} rendererInfo - data that will be assigned for the Component
         */
        updateBody(rendererInfo) {
            if (this.isOpen) {
                return
            }

            this.dynamicData = Object.assign({}, rendererInfo.data)
            this.component = rendererInfo.component
            this.runnerId = rendererInfo.runnerId
        }
    },

    beforeDestroy() {
        const pattern = /^add-control-/;
        if (!pattern.test(this.runnerId)) {
            this.$el.style.width = 0;
            document.getElementsByTagName("body")[0].style.marginRight = 0;
        }
    },

    created() {
        // listen to render even
        this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.INJECT, this.updateBody)

        // listen to open
        this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.SIDEBAR.OPEN, this.open)
    }
}
</script>
