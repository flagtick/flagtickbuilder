<template>
    <div class="sidebar-form-configuration">
        <div class="grid-container">
            <a
                href="javascript:void(0)"
                class="grid-item"
                v-for="(controlInfo, controlKey) in controlTypes"
                v-show="!controlInfo.isHidden"
                @click="selectedControl(controlKey)"
            >
                <span class="icon">
                    <component :is="loadIcons" :elementIcon="controlInfo.slug"/>
                </span>
                <div class="control-container-detail">
                    <p class="type-headline" v-text="controlInfo.name"></p>
                    <p class="type-desc" v-text="controlInfo.description"></p>
                </div>
            </a>
        </div>
    </div>
</template>


<script>
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import {CONTROLS, createControlData} from "@/configs/controls";
    import {SIDEBAR_BODY_MIXIN} from "@/mixins/sidebar-body-mixin";
    import SidebarControlIconList from "./SidebarControlIconList";

    export default {
        name: "SidebarControlSelectList",
        mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],
        computed: {
            controlTypes: () => CONTROLS,
            loadIcons: () => SidebarControlIconList,
        },

        data:() => ({
            dataKey: "newControlData",
            newControlData: null
        }),
        methods: {
            /**
             * Selected a control => we will generate a new control data then emit it to the section
             * @param controlKey
             */
            selectedControl(controlKey) {
                if (!CONTROLS[controlKey]) {
                    alert(`Control ${controlKey} doesn't exists in Vue-Form-Builder`)
                    return
                }

                // create
                this.newControlData = createControlData(controlKey)
                this.save(true)
            }
        }
    }
</script>

<style scoped>

    .sidebar-form-configuration {
        width: 100%;
        height: 100%;
        background: white;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        background-color: #fff;
        grid-gap: 20px;
    }

    .control-container-detail {
        margin-left: 16px;
    }

    .grid-item {
        background: #f5f5f5;
        padding: 20px;
        border-radius: 5px;
        display: flex;
        text-decoration: none;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .type-headline {
        font-size: 16px;
        margin: 0;
        color: #0473AA;
        font-weight: bold;
        text-align: left;
    }

    .type-desc {
        font-size: 14px;
        margin: 5px 0 0;
        text-align: left;
        color: #999;
    }
</style>
