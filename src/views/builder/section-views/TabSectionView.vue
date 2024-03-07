<template>
    <div class="tab-section">
        <div class="headline-block p5" v-show="section.isShowHeadline">
            <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
            <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
        </div>

        <div class="tabs">

            <input type="radio"
                   v-for="rowId in section.rows"
                   :key="getRadioID(rowId)"
                   :id="getRadioID(rowId)"
                   name="tab-control"
            >

            <draggable
                ghost-class="ghost"
                :list="section.rows"
                :group="rowDragGroup"
                tag="ul"
                :disabled="!permissions.canReOrderingRow"
            >

                <li
                    v-for="rowId in section.rows"
                    :key="getTabHeaderID(rowId)"
                    :id="getTabHeaderID(rowId)"
                >
                    <label :for="getRadioID(rowId)" role="button">
                        <span
                            v-if="rows[rowId].extendData.tabIcon"
                            v-html="rows[rowId].extendData.tabIcon"
                        ></span>
                        <br>
                        <span v-text="rows[rowId].extendData.tabName"></span>
                    </label>
                </li>

            </draggable>

            <div class="content">
                <TabContentRowView
                    v-for="rowId in section.rows"
                    :key="rowId"
                    :row="rows[rowId]"
                    :section="section"
                    :controls="controls"
                    :permissions="permissions"

                    @delete-row="deleteRow"
                />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    // @ts-ignore
    import {SECTION_VIEW_MIXINS} from "@/mixins/section-view-mixins";
    // @ts-ignore
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    // @ts-ignore
    import {ALERT_DIALOG} from "@/libraries/alert-dialog";
    // @ts-ignore
    import {EVENT_CONSTANTS} from '@/configs/events'

    import TabContentRowView from "@/views/builder/row-views/TabContentRowView.vue";
    import {TabRow} from "@/interfaces/tab-row.interface";
    import Vue from "vue";

    export default Vue.extend({
        name: "TableSectionView",
        mixins:[SECTION_VIEW_MIXINS, STYLE_INJECTION_MIXIN],
        components: {
            TabContentRowView
        },

        computed: {
            hasTabs() : boolean {
                // @ts-ignore
                return this.section.rows.length > 0
            }
        },

        methods: {
            getRadioID(uniqueId : string): string {
                return 'tab-radio-'.concat(uniqueId)
            },

            getTabHeaderID(uniqueId: string): string {
                return 'tab-header-'.concat(uniqueId)
            },

            addNewTab(sectionId : string) {
                // @ts-ignore
                if (sectionId !== this.section.uniqueId) {
                    return;
                }

                const tabName = prompt("Give it a name for your new tab")
                if (!tabName) {
                    return ALERT_DIALOG.show("Tab Name can't be empty.");
                }

                const tabDetail : TabRow = {
                    tabName,
                    defaultChecked: (
                        //@ts-ignore
                        this.section.rows.length == 0
                    )
                }

                // @ts-ignore
                this.addRow(null, tabDetail)

                // @ts-ignore
                if (this.section.rows.length == 1) {
                    this.defaultSelectTab()
                }
            },

            defaultSelectTab() {
                // @ts-ignore
                this.$nextTick(() => {
                    // @ts-ignore
                    const radioDom = document.getElementById(this.getRadioID(this.section.rows[0]))
                    // @ts-ignore
                    radioDom.checked = true
                })
            }
        },

        created() {
            // @ts-ignore
            this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.ROW.ADD_TAB, this.addNewTab)
            // @ts-ignore
            this.$formEvent.$on(EVENT_CONSTANTS.BUILDER.ROW.DELETED, this.defaultSelectTab)
        }
    })
</script>
