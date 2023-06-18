/**
 * Supported Controls in Flagtick
 * @author Lorence
 */
import {STYLES} from "@/configs/styles";
import {HELPER} from "@/libraries/helper";

import ButtonControl from "@/views/controls/ButtonControl"
import EmptyBlockControl from "@/views/controls/EmptyBlockControl";
import TextBlockControl from "@/views/controls/TextBlockControl";
import TextHTMLControl from "@/views/controls/TextHTMLControl";
import LabelControl from "@/views/controls/LabelControl";
import LinkControl from "@/views/controls/LinkControl";
import VideoControl from "@/views/controls/VideoControl";

import TextBlockConfigView from "@/views/control-configs/TextBlockConfigView";
import TextHTMLConfigView from "@/views/control-configs/TextHTMLConfigView";
import ButtonConfigView from "@/views/control-configs/ButtonConfigView";
import LabelConfigView from "@/views/control-configs/LabelConfigView";
import LinkConfigView from "@/views/control-configs/LinkConfigView";
import VideoConfigView from "@/views/control-configs/VideoConfigView";

const CONTROLS = {

    label: {
        name: "Label",
        slug: "label",
        description: "Simple label text show up in your Form",
        disableValue: true,

        configData: {
            forAttribute: null,

            isShowLabel: false
        },

        disableValidation: true,
        fieldComponent: LabelControl,
        configComponent: LabelConfigView
    },

    downloadLink: {
        name: "Download Link",
        slug: "download-link",
        description: "Download Link for your own purpose",
        disableValue: true,

        configData: {
            href: "",
            isCenter: false,
            target: "_self",
            text: "",
            additionalFieldClass: 'form-control'
        },

        disableValidation: true,
        fieldComponent: LinkControl,
        configComponent: LinkConfigView
    },

    button: {
        name: "Button",
        slug: "button",
        description: "Simple button for your own purpose",
        disableValidation: true,
        disableValue: true,

        configData: {
            buttonClass: STYLES.BUTTON.PRIMARY,
            buttonType: "button",

            emitEventCode: "",
            emitEventData: "",

            isRunValidation: false,

            isShowLabel: false,
        },

        fieldComponent: ButtonControl,
        configComponent: ButtonConfigView
    },

    emptyBlock: {
        name: "Empty Block",
        slug: "empty-block",
        description: "Empty block to design your section/row.",
        disableValidation: true,
        disableValue: true,

        fieldComponent: EmptyBlockControl,

        configData: {
            isShowLabel: false,
        }
    },

    textBlock: {
        name: "Text Block",
        slug: "text-block",
        description: "Block with text only (without any controls)",
        disableValidation: true,
        disableValue: true,

        fieldComponent: TextBlockControl,
        configComponent: TextBlockConfigView,

        configData: {
            text: ""
        }
    },

    textHTML: {
        name: "Text HTML",
        slug: "text-html",
        description: "Block with text only (without any controls)",
        disableValidation: true,
        disableValue: true,

        fieldComponent: TextHTMLControl,
        configComponent: TextHTMLConfigView,

        configData: {
            text: ""
        }
    },

    video: {
        name: "Video",
        slug: "video",
        description: "Video for your own purpose",
        disableValue: true,

        configData: {
            videoID: "",
            isCenter: false
        },

        disableValidation: true,
        fieldComponent: VideoControl,
        configComponent: VideoConfigView
    },
};

const CONTROL_DEFAULT_DATA = {
    'uniqueId': '',
    'type': '',
    'name': '',
    'slug': '',

    'label': '',
    'subLabel': '',
    'isShowLabel': true,

    'placeholderText': '', // :placeholder

    'containerClass': 'col-md-4 md-layout-item md-size-33',
    'additionalContainerClass': '', // :class for the <div> outer container

    'additionalFieldClass': '', // :class for <input> <select> ...
    'additionalLabelClass': '', // :class for the <label>

    'defaultValue': '',

    /**
     * Validation that applied to the control
     * @var {ValidationRule[]} validations
     */
    'validations': [],

};

/**
 * Create new control data
 * @param controlKey
 * @returns {CONTROL_DEFAULT_DATA}
 */
function createControlData(controlKey) {
    const newData = Object.assign({}, CONTROL_DEFAULT_DATA, CONTROLS[controlKey].configData || {})

    // set default data
    newData.label = CONTROLS[controlKey].name
    newData.slug = CONTROLS[controlKey].slug
    newData.type = controlKey

    // unique ID is a must - I used UUIDv4 => 99% Unique
    newData.uniqueId = "control-" + HELPER.getUUIDv4()

    return newData
}

export {
    CONTROLS,
    CONTROL_DEFAULT_DATA,
    createControlData
}
