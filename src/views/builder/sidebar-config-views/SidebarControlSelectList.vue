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
                <p class="type-headline" v-text="controlInfo.name"></p>
                <p class="type-desc" v-text="controlInfo.description"></p>
            </a>
        </div>
    </div>
</template>


<script>
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import {CONTROLS, createControlData} from "@/configs/controls";
    import {SIDEBAR_BODY_MIXIN} from "@/mixins/sidebar-body-mixin";

    export default {
        name: "SidebarControlSelectList",
        mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],
        computed: {
            controlTypes: () => CONTROLS
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
        grid-gap: 20px;
        margin-top: 24px;
    }

    .grid-item {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .type-headline {
        font-size: 16px;
        font-weight: bold;
    }

    .type-desc {
        font-size: 14px;
        margin-top: 5px;
        color: #777;
    }
</style>
