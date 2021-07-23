/*
	new Swiper('.swiper-container', {
		loop: true,
		navigation: {
			nextEl: '.arrow',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			541: {
				slidesPerView: 2,
				spaceBetween: 40
			}
		}
	});
	
	const menuButton = document.querySelector('.menu-button');
	const menu = document.querySelector('.header');
	menuButton.addEventListener('click', function () {
		menuButton.classList.toggle('menu-button-active');
		menu.classList.toggle('header-active');
	})
*/
const getElement = (tagName, classNames, attributes) => {
  const element = document.createElement(tagName);
  
  if (classNames) {
    element.classList.add(...classNames);
  }
  
  if (attributes) {
    for (const attribute in attributes) {
      element[attribute] = attributes[attribute];
    }
  }
  
  return element;
}

const createHeader = (param) => {
  const header = getElement('header');
  const container = getElement('div', ['container']);
  const wrapper = getElement('div', ['header']);
  
  if (param.header.logo) {
    const logo = getElement('img', ['logo'], {
      src: param.header.logo,
      alt: 'Логотип ' + param.title,
    });
    
    wrapper.append(logo);
  }
  
  if (param.header.menu) {
    const nav = getElement('nav', ['menu-list']);
    const allNavLink = param.header.menu.map(item => {
      const navLink = getElement('a', ['menu-link'], {
        href: item.link,
        textContent: item.title,
      });
      
      return navLink;
    })
    nav.append(...allNavLink);
    wrapper.append(nav);
  }
  
  if (param.header.social) {
    const socialWrapper = getElement('div', ['social']);
    const allSocial = param.header.social.map(item => {
      const socialLink = getElement('a', ['social-link']);
      socialLink.append(getElement('img', [], {
        src: item.image,
        alt: item.title,
      }));
      
      socialLink.href = item.link;
      
      return socialLink;
    });
    socialWrapper.append(...allSocial);
    wrapper.append(socialWrapper);
  }
  
  header.append(container);
  container.append(wrapper);
  
  return header;
}

const createMain = ({title, main: {genre, rating, description, trailer}}) => {
  
  const main = getElement('main');
  
  const container = getElement('div', ['container']);
  main.append(container);
  const wrapper = getElement('div', ['main-content']);
  container.append(wrapper);
  const content = getElement('div', ['content']);
  wrapper.append(content);
  
  if (genre) {
    const genreSpan = getElement('span',
      ['genre', 'animated', 'fadeInRight'],
      {textContent: genre}
    );
    
    content.append(genreSpan);
  }
  
  if (rating) {
    const ratingBlock = getElement('div', ['genre', 'animated', 'fadeInRight']);
    const ratingStars = getElement('div', ['rating-stars']);
    const ratingNumber = getElement('div', ['rating-number'], {
      textContent: `${rating}/10`
    });
    
    for (let i = 0; i < 10; i++) {
      const star = getElement('img', ['star'], {
        alt: i ? '' : `Рейтинг ${rating} из 10`,
        src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
      });
      
      ratingStars.append(star);
    }
    
    ratingBlock.append(ratingStars, ratingNumber);
    content.append(ratingBlock);
  }
  
  content.append(getElement('h1',
    ['main-title', 'animated', 'fadeInRight'],
    {textContent: title}
  ));
  
  return main;
  
};

const movieConstructor = (selector, options) => {
  
  const app = document.querySelector(selector);
  app.classList.add('body-app');
  
  app.style.backgroundImage = options.background ?
    `url('${options.background}')` : '';
  
  document.title = options.title;
  
  if (options.header) {
    app.append(createHeader(options));
  }
  
  if (options.main) {
    app.append(createMain(options))
  }
  
};

movieConstructor('.app', {
  title: 'Ведьмак',
  background: 'witcher/background.jpg',
  header: {
    logo: 'witcher/logo.png',
    social: [
      {
        title: 'Twitter',
        link: 'https://twitter.com',
        image: 'witcher/social/twitter.svg'
      },
      {
        title: 'Instagram',
        link: 'https://instagram.com',
        image: 'witcher/social/instagram.svg'
      },
      {
        title: 'Facebook',
        link: 'https://facebook.com',
        image: 'witcher/social/facebook.svg',
      },
    ],
    menu: [
      {
        title: 'Описание',
        link: '#',
      },
      {
        title: 'Трейлер',
        link: '#',
      },
      {
        title: 'Отзывы',
        link: '#',
      },
    ]
  },
  main: {
    genre: '2019, фэнтези',
    rating: '8',
    description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.',
    trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
  }
});