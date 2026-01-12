// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
var defaultComputedFields = {
	slug: {
		type: "string",
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
	slugAsParams: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
	},
};
var Insight = defineDocumentType(() => ({
	name: "Insight",
	filePathPattern: `insights/**/*.mdx`,
	contentType: "mdx",
	fields: {
		title: {
			type: "string",
			required: true,
		},
		description: {
			type: "string",
		},
		date: {
			type: "date",
			required: true,
		},
		published: {
			type: "boolean",
			default: true,
		},
		category: {
			type: "enum",
			options: ["trends", "analytics", "predictions"],
			default: "analytics",
		},
		icon: {
			type: "string",
			default: "\u{1F4CA}",
		},
	},
	computedFields: defaultComputedFields,
}));
var contentlayer_config_default = makeSource({
	contentDirPath: "./content",
	documentTypes: [Insight],
});
export { Insight, contentlayer_config_default as default };
//# sourceMappingURL=compiled-contentlayer-config-N5RJVRCP.mjs.map
