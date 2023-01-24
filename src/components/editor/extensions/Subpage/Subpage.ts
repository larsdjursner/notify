import Link from "@tiptap/extension-link"

const SubpageLink = Link.extend({
    // addCommands() {
    //     return {
    //         setSubpage:
    //             (attributes) =>
    //             ({ chain }) => {
    //                 return chain()
    //                     .setMark(this.name, attributes)
    //                     .setMeta("preventAutolink", true)
    //                     .run()
    //             },

    //         toggleSubpage:
    //             (attributes) =>
    //             ({ chain }) => {
    //                 return chain()
    //                     .toggleMark(this.name, attributes, {
    //                         extendEmptyMarkRange: true,
    //                     })
    //                     .setMeta("preventAutolink", true)
    //                     .run()
    //             },

    //         unsetSubpage:
    //             () =>
    //             ({ chain }) => {
    //                 return chain()
    //                     .unsetMark(this.name, { extendEmptyMarkRange: true })
    //                     .setMeta("preventAutolink", true)
    //                     .run()
    //             },
    //     }
    // },

    onCreate() {
        console.log("hey")
    },
})

export default SubpageLink
