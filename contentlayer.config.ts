import { ComputedFields, defineDocumentType, makeSource } from "contentlayer2/source-files";

const defaultComputedFields: ComputedFields = {
	slug: {
		type: "string",
		resolve: (doc) => `/${doc._raw.flattenedPath}`,
	},
	slugAsParams: {
		type: "string",
		resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
	},
};

export const Insight = defineDocumentType(() => ({
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
			default: "📊",
		},
	},
	computedFields: defaultComputedFields,
}));

export default makeSource({
	contentDirPath: "./content",
	documentTypes: [Insight],
});
