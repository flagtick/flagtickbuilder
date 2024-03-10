<template>
    <div>
        <div :class="styles.FORM.FORM_GROUP">
            <label>Text for Text-Block</label>
            <div id="app">
                <vue-editor useCustomImageHandler
                    @image-added="handleImageAdded"
                    contenteditable="false"
                    @text-change="textChangeMode"
                    class="flagtick-vue2-editor"
                    v-model="control.text">
                </vue-editor>
            </div>
        </div>
    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";
    import { VueEditor } from "vue2-editor";

    export default {
        name: "TextHTMLConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN],
        components: {
            VueEditor
        },
        mounted() {
            let scope = this;
            this.$nextTick(() => {
                scope.modifyEditorMode('true');
            });
        },
        methods : {
            modifyEditorMode(bool) {
                const editor = document.querySelector('.ql-container .ql-editor');
                if (editor) {
                    editor.setAttribute('contenteditable', bool);
                }
            },
            textChangeMode() {
                let scope = this;
                const editor = document.querySelector('.ql-container .ql-editor');
                if (editor) {
                    editor.addEventListener('mouseenter', function() {
                        scope.modifyEditorMode('true');
                    });
                    editor.addEventListener('mouseleave', function() {
                        scope.modifyEditorMode('false');
                    });
                }
            },
            handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
                const formData = new FormData();
                formData.append("file", file);
                axios.post('/api/timage', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + window.localStorage.getItem('auth.token')
                        }
                    })
                    .then(result => {
                        let url = result.data;
                        Editor.insertEmbed(cursorLocation, "image", url);
                        resetUploader();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
        }
    }
</script>
