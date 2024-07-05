import { Page, Layout, io } from "@interval/sdk";

export default new Page({
	name: "Global Settlement",
	handler: async () => {
		return new Layout({
			title: 'Global Settlement',
			children: [
			  io.display.heading('Settlements'),
			  
			], menuItems: [
			  {
				label: "Global Settlements",
				route: "GlobalSettlement/globalSettlement",
			  },
			],
		  });
	},
});
