import Component from "../component.js";

class Footer extends Component{
	render() {
		return new Promise(resolve => {
			resolve(`
				<div class="footer__col">
					<span>© BuzzzyB' — 2021. All Rights Reserved</span>
				</div>

				<div class="footer__col">
					<span>designed & developed by</span>
					<span class="developer">Polina Pashkovskaya</span>
				</div>
			`);
		});
	}
}

export default Footer;