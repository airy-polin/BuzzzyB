class Preloader {
	constructor() {
		this.startColorIndex = 0;

		const COLOR_LAVENDER_LIGHT = '#c9e4ff',
			COLOR_LAVENDER_MEDIUM = '#82a6e0',
			COLOR_LAVENDER_DARK = '#3f5bae',
			COLOR_BLACK = 'black';
		this.colors = [COLOR_LAVENDER_MEDIUM, COLOR_BLACK, COLOR_LAVENDER_MEDIUM];
	}

	render() {
		return new Promise(resolve => {
			resolve(`
				<svg class="preloader" width="120" height="120" viewBox="0 0 205 205" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0)">
					<path d="M35.7663 38.6188C22.062 43.216 21.3139 43.4895 21.0949 44.1616C20.9496 44.5425 18.9156 54.356 16.5192 65.9575C12.7984 84.2695 12.2826 87.1431 12.7403 87.6316C13.0291 87.9067 20.5149 94.5657 29.3467 102.398L45.4457 116.625L57.4816 112.663C64.141 110.493 73.651 107.309 78.654 105.603L87.7407 102.454L92.142 80.948C94.571 69.1354 96.4751 59.2299 96.367 58.9971C96.2589 58.7643 88.8143 52.0251 79.843 44.0706L63.4648 29.5989L56.8466 31.6887C53.1785 32.8655 43.7097 35.9701 35.7663 38.6188ZM75.6261 49.2684C83.1519 55.9481 89.321 61.525 89.3199 61.6257C89.2884 61.7361 87.6365 69.8222 85.6437 79.5556L82.0098 97.3048L79.0065 98.4689C77.338 99.1045 69.465 101.764 61.4718 104.362L46.9502 109.121L36.2943 99.6674C30.4433 94.4565 24.2633 88.9499 22.5788 87.4508L19.4791 84.6672L23.177 66.5966L26.8543 48.566L38.1929 44.8281C44.4182 42.764 52.3204 40.1954 55.7459 39.0964L61.93 37.1125L75.6261 49.2684Z" fill="#82a6e0"/>
					<path d="M119.169 55.6606C109.78 58.8064 104.079 60.8361 103.955 61.0763C103.852 61.2765 101.798 71.1301 99.3988 82.9329C96.1274 98.8941 95.1079 104.47 95.4368 104.766C95.6662 104.96 103.182 111.609 112.074 119.523L128.292 133.912L143.046 129.045C151.141 126.347 160.641 123.132 164.159 121.904L170.578 119.61L174.947 98.3152C177.375 86.6033 179.308 76.7887 179.291 76.5267C179.274 76.2648 171.84 69.4553 162.779 61.4293L146.291 46.8254L140.219 48.7402C136.914 49.8002 127.415 52.9146 119.169 55.6606ZM158.253 66.2913C165.73 72.9201 171.879 78.4364 171.979 78.5382C172.078 78.64 170.516 86.7976 168.492 96.6414L164.836 114.531L162.409 115.511C161.074 116.039 153.201 118.699 144.874 121.404L129.777 126.347L116.031 114.141L102.295 101.964L105.972 83.9335L109.659 65.9332L121.433 61.9888C127.921 59.8069 135.804 57.1776 138.947 56.1359L144.687 54.2274L158.253 66.2913Z" fill="black"/>
					<path d="M66.0633 118.569C56.3107 121.832 48.2243 124.66 48.1517 124.851C48.0693 125.011 46.0051 134.834 43.6063 146.637L39.2257 168.103L40.0024 168.857C40.4309 169.254 47.907 175.883 56.5688 183.602L72.3584 197.594L92.539 190.986C103.645 187.356 113.175 184.132 113.753 183.846L114.786 183.314L119.1 162.371C121.455 150.85 123.448 141.116 123.493 140.734C123.59 140.101 121.02 137.716 106.945 125.213L90.2682 110.436L87.0744 111.528C85.2955 112.132 75.8461 115.297 66.0633 118.569ZM102.619 130.279L116.355 142.456L112.762 160.125C110.79 169.818 109.057 177.964 108.933 178.204C108.769 178.524 103.634 180.339 91.3444 184.449L73.9721 190.223L60.4059 178.159C52.9504 171.49 46.7705 165.983 46.6709 165.881C46.5022 165.668 53.5217 130.751 53.8729 129.97C54.0278 129.619 76.3847 121.978 86.0138 118.956L88.873 118.072L102.619 130.279Z" fill="black"/>
					</g>
					<defs>
					<clipPath id="clip0">
					<rect width="163" height="163" fill="white" transform="translate(-0.000976562 49.7928) rotate(-17.7872)"/>
					</clipPath>
					</defs>
				</svg>
			`);
		});
	}

	afterRender() {
		return new Promise(() => {
			this.timerId = setInterval(() => this.changeOutline(), 300);
		});
	}

	changeOutline() {
		const preloaderContainer = document.getElementsByClassName('content')[0];
		this.preloaderParts = preloaderContainer.getElementsByTagName('path');
	
		let i = this.startColorIndex;
	
		for (let j = 0; j < this.colors.length; j++) {
			this.preloaderParts[i].setAttribute('style', `fill: ${this.colors[j]}`);
			i = (i + 1) % this.preloaderParts.length;
		}
	
		this.startColorIndex = (this.startColorIndex + 1) % this.preloaderParts.length;
	}

	finish() {
		clearInterval(this.timerId);
	}
}

export default Preloader;