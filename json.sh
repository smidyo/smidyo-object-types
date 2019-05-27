rm -rf ./json-schemas/*
typescript-json-schema "types/pipeline/yield.ts" YieldPipelineBody -o "./json-schemas/yield-pipeline-body.json" --ignoreErrors --required
typescript-json-schema "types/pipeline/process.ts" ProcessPipelineBody -o "./json-schemas/process-pipeline-body.json" --ignoreErrors --required
typescript-json-schema "types/pipeline/form.ts" FormPipelineBody -o "./json-schemas/form-pipeline-body.json" --ignoreErrors --required
typescript-json-schema "types/table/index.ts" TableBody -o "./json-schemas/table-body.json" --ignoreErrors --required
