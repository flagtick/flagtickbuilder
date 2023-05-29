<template>
    <div>
        <div :class="styles.FORM.FORM_GROUP">
            <label>Text for Text-Block</label>
            <div id="app">
                <vue-editor useCustomImageHandler @image-added="handleImageAdded"
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
            new Promise(() => {
                const stickyContainer = document.querySelector('#app .ql-toolbar');
                const stickyMobile = stickyContainer.offsetTop;
                const stickyDesktop = stickyContainer.offsetTop;

                const stickyNav = () => {
                    if (window.outerWidth <= 1024) {
                        if (window.scrollY > stickyMobile) {
                            stickyContainer.classList.add('isSticky');
                        } else {
                            stickyContainer.classList.remove('isSticky');
                        }
                    }
                    if (window.outerWidth > 1025) {
                        if (window.scrollY >= stickyDesktop) {
                            stickyContainer.classList.add('isSticky');
                        } else {
                            stickyContainer.classList.remove('isSticky');
                        }
                    }
                };

                stickyNav();
                window.addEventListener('scroll', () => {
                    stickyNav();
                });

            });
        },
        methods : {
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
