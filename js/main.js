const createElement = (tagName, classNames, attributes) => {
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

const createHeader = ({title, header: {logo, menu, social}}) => {
  const header = createElement('header');
  const container = createElement('div', ['container']);
  const wrapper = createElement('div', ['header-wrapper']);
  
  if (logo) {
    const logoElem = createElement('img', ['logo'], {
      src: logo,
      alt: 'Логотип ' + title,
    });
    
    wrapper.append(logoElem);
  }
  
  if (menu) {
    const nav = createElement('nav', ['menu-list']);
    const allNavLink = menu.map(item => {
      return createElement('a', ['menu-link'], {
        href: item.link,
        textContent: item.title,
      });
    })
    nav.append(...allNavLink);
    wrapper.append(nav);
    
    const menuBtn = createElement('button', ['menu-button']);
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('menu-button-active');
      wrapper.classList.toggle('header-active');
    });
    container.append(menuBtn);
  }
  
  if (social) {
    const socialWrapper = createElement('div', ['social']);
    const allSocial = social.map(item => {
      const socialLink = createElement('a', ['social-link']);
      socialLink.append(createElement('img', [], {
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

const createMain = ({title, main: {genre, rating, description, trailer, slider}}) => {
  
  const main = createElement('main');
  
  const container = createElement('div', ['container']);
  main.append(container);
  const wrapper = createElement('div', ['main-content']);
  container.append(wrapper);
  const content = createElement('div', ['content']);
  wrapper.append(content);
  
  if (genre) {
    const genreSpan = createElement('span',
      ['genre', 'animated', 'fadeInRight'],
      {textContent: genre}
    );
    
    content.append(genreSpan);
  }
  
  if (rating) {
    const ratingBlock = createElement('div', ['genre', 'animated', 'fadeInRight']);
    const ratingStars = createElement('div', ['rating-stars']);
    const ratingNumber = createElement('div', ['rating-number'], {
      textContent: `${rating}/10`
    });
    
    for (let i = 0; i < 10; i++) {
      const star = createElement('img', ['star'], {
        alt: i ? '' : `Рейтинг ${rating} из 10`,
        src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
      });
      
      ratingStars.append(star);
    }
    
    ratingBlock.append(ratingStars, ratingNumber);
    content.append(ratingBlock);
  }
  
  content.append(createElement('h1',
    ['main-title', 'animated', 'fadeInRight'],
    {textContent: title}
  ));
  
  if (description) {
    content.append(createElement('p',
      ['main-description', 'animated', 'fadeInRight'],
      {textContent: description}
    ));
  }
  
  if (trailer) {
    const youTubeLink = createElement('a',
      ['button', 'animated', 'fadeInRight', 'youtube-modal'],
      {
        href: trailer,
        textContent: 'Смотреть трейлер',
      }
    );
    
    const youTubeImgLink = createElement('a',
      ['play', 'youtube-modal'],
      {
        href: trailer,
        ariaLabel: 'Смотреть трейлер',
      }
    );
    
    const iconPlay = createElement('img',
      ['play-img'],
      {
        src: 'img/play.svg',
        alt: '',
        ariaHidden: true,
      }
    );
    
    content.append(youTubeLink);
    youTubeImgLink.append(iconPlay);
    wrapper.append(youTubeImgLink);
  }
  
  if (slider) {
    const sliderBlock = createElement('div', ['series']);
    const swiperBlock = createElement('div', ['swiper-container']);
    const swiperWrapper = createElement('div', ['swiper-wrapper']);
    const arrow = createElement('button', ['arrow']);
    
    const slides = slider.map(item => {
      
      const swiperSlide = createElement('div', ['swiper-slide']);
      const card = createElement('figure', ['card']);
      const cardImage = createElement('img', ['card-img'], {
        src: item.img,
        // alt: (item.title ? item.title + ' ' : '') + (item.subtitle ? item.subtitle : '')
        alt: ((item.title || '') + ' ' + (item.subtitle || '')).trim()
      })
      
      card.append(cardImage);
      
      
      if (item.title || item.subtitle) {
        const cardDescription = createElement('figcaption', ['card-description']);
        cardDescription.innerHTML = `
          ${item.title ? `<p class="card-title">${item.title}</p>` : ''}
          ${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
        `;
        
        card.append(cardDescription)
      }
      swiperSlide.append(card);
      return swiperSlide;
    });
    swiperWrapper.append(...slides);
    swiperBlock.append(swiperWrapper);
    sliderBlock.append(swiperBlock, arrow);
    
    container.append(sliderBlock);
    
    new Swiper(swiperBlock, {
      loop: true,
      navigation: {
        nextEl: arrow,
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
  }
  
  return main;
  
};

const createFooter = ({footer: {copyright, menu}}) => {
  
  const footer = createElement('footer', ['footer']);
  const container = createElement('div', ['container']);
  footer.append(container);
  const footerContent = createElement('div', ['footer-content'])
  container.append(footerContent);
  
  if (copyright) {
    const footerLeft = createElement('div', ['left']);
    footerContent.append(footerLeft);
    const copyrightBlock = createElement('span', ['copyright'], {
      textContent: copyright,
    })
    footerLeft.append(copyrightBlock);
  }
  
  if (menu) {
    const footerRight = createElement('div', ['right']);
    footerContent.append(footerRight);
    const footerMenu = createElement('nav', ['footer-menu']);
    const footerMenuItem = menu.map(item => {
      return createElement('a', ['footer-link'], {
        href: item.link,
        textContent: item.title,
      })
    })
    footerMenu.append(...footerMenuItem);
    footerRight.append(footerMenu);
  }
  
  return footer;
}

const movieConstructor = (selector, options) => {
  
  const app = document.querySelector(selector);
  app.classList.add('body-app');
  
  app.style.color = options.fontColor || '';
  app.style.backgroundColor = options.backgroundColor || '';
  
  if (options.subColor) {
    document.documentElement.style.setProperty('--sub-color', options.subColor);
  }
  
  if (options.favicon) {
    const index = options.favicon.lastIndexOf('.');
    const type = options.favicon.substring(index + 1);
    
    const favicon = createElement('link', null, {
      rel: 'icon',
      href: options.favicon,
      type: 'image/' + (type === 'svg' ? 'image/svg-xml' : type),
    });
    
    document.head.append(favicon);
  }
  
  app.style.backgroundImage = options.background ?
    `url('${options.background}')` : '';
  
  document.title = options.title;
  
  if (options.header) {
    app.append(createHeader(options));
  }
  
  if (options.main) {
    app.append(createMain(options))
  }
  
  if (options.footer) {
    app.append(createFooter(options))
  }
};

movieConstructor('#app', {
  title: 'Ведьмак',
  background: 'witcher/background.jpg',
  favicon: 'witcher/logo.png',
  fontColor: '#ffffff',
  backgroundColor: '#141218',
  subColor: '#9D2929',
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
    slider: [
      {
        img: 'witcher/series/series-1.jpg',
        title: 'Начало конца',
        subtitle: 'Серия №1',
      },
      {
        img: 'witcher/series/series-2.jpg',
        title: 'Четыре марки',
        subtitle: 'Серия №2',
      },
      {
        img: 'witcher/series/series-3.jpg',
        title: 'Предательская луна',
        subtitle: 'Серия №3',
      },
      {
        img: 'witcher/series/series-4.jpg',
        title: 'Банкеты, ублюдки и похороны',
        subtitle: 'Серия №4',
      },
    ]
  },
  footer: {
    copyright: '© 2020 The Witcher. All right reserved.',
    menu: [
      {
        link: '#',
        title: 'Privacy Policy',
      },
      {
        link: '#',
        title: 'Terms of Service',
      },
      {
        link: '#',
        title: 'Legal',
      },
    ],
  }
});