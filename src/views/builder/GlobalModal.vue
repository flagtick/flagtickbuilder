<template>
    <div id="vfb-global-modal" class="modal">

        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <span class="close"
                      @click="close"
                      v-html="$form.getIcon('close', '24px', '24px', '#fff')">
                </span>
                <h4 v-text="modalTitle"></h4>
            </div>

            <div class="modal-body">
                <!--- For dynamic purpose --->
                <component
                    v-if="component"
                    :is="component"
                    :dataPackage="dynamicData"
                    :formData="formData"
                    :permissions="permissions"

                    @save="save"
                    @saveAndClose="saveAndClose"
                    @close="close"
                />
            </div>
        </div>

    </div>
</template>

<script>
    import {EVENT_CONSTANTS} from "@/configs/events";
    import {ALERT_DIALOG} from "@/libraries/alert-dialog";

    const MODAL_EVENT = EVENT_CONSTANTS.BUILDER.MODAL

    export default {
        name: "GlobalModal",
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
            dynamicData: {},
            runnerId: null,
            isOpen: false,
            modalTitle: "",
        }),
        methods: {
            open(runnerId) {
                if (this.isOpen) {
                    ALERT_DIALOG.show('Please close the current active modal before open another')
                    return
                }

                this.$el.style.display = "block";

                this.$formEvent.$emit(MODAL_EVENT.OPENED, runnerId)
                this.isOpen = true
            },

            save(specialData = {}) {
                this.$formEvent.$emit(
                    MODAL_EVENT.SAVE,
                    this.runnerId,
                    Object.assign({}, specialData)
                )
            },

            saveAndClose(specialData = {}) {
                this.$formEvent.$emit(
                    MODAL_EVENT.SAVE_AND_CLOSE,
                    this.runnerId,
                    Object.assign({}, specialData)
                )

                this.close()
            },

            close() {
                this.$el.style.display = "none"

                this.$formEvent.$emit(
                    MODAL_EVENT.AFTER_CLOSED,
                    this.runnerId,
                    null
                )

                this.component = null
                this.dynamicData = {}
                this.runnerId = null
                this.isOpen = false
            },

            updateBody(rendererInfo, title = "") {
                if (this.isOpen) {
                    return
                }

                this.dynamicData = Object.assign({}, rendererInfo.data)
                this.component = rendererInfo.component
                this.runnerId = rendererInfo.runnerId
                this.modalTitle = title
            }
        },

        created() {
            this.$formEvent.$on(MODAL_EVENT.INJECT, this.updateBody)
            this.$formEvent.$on(MODAL_EVENT.OPEN, this.open)
        }
    }
</script>
