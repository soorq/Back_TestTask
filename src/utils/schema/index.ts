import { z } from 'zod';

export const DataDtoSchema = z.object({
	actions: z.array(
		z.object({
			account_action_seq: z.number(),
			action_trace: z.object({
				account_ram_deltas: z.array(z.any()),
				act: z.any(),
				action_ordinal: z.number(),
				block_num: z.number(),
				block_time: z.string().optional(),
				closest_unnotified_ancestor_action_ordinal: z.number(),
				context_free: z.boolean(),
				creator_action_ordinal: z.number(),
				elapsed: z.number(),
				producer_block_id: z.string(),
				receipt: z.any(),
				receiver: z.string().catch('').optional(),
				trx_id: z.string().catch('').optional(),
			}),
			block_num: z.number(),
			block_time: z.string().optional(),
			global_action_seq: z.number(),
			irreversible: z.boolean(),
		}),
	),
});

export type DataDto = z.infer<typeof DataDtoSchema>;
