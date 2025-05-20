import type { Actions } from './$types';
import { prisma } from "$lib/prismaClient.server";

export const actions: Actions = {
	joinWaitlist: async ({ request }) => {
		const formData = await request.formData();

		const firstName = formData.get('firstName') as string;
		const email = formData.get('email') as string;
		const betaPlus = formData.get('betaPlus') === 'on'; // Checkbox sends 'on' if checked, null otherwise

		await prisma.waitlist.create({ data: { firstName, email, betaPlus } });

		return { success: true, message: 'Successfully joined the waitlist!' };
	}
};
