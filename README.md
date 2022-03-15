# NextJS Intro

framework는 내가 코드를 적절한 위치에 정해진대로 작성하기만하면 나의 코드를 불러와서 동작을 시켜준다.
library는 내가 원하는 대로 코드를 작성하고 내가 사용하고 싶을때 사용한다.

1. NextJs란

SSR, 파일 기반 라우팅, 풀스택 빌드 구현을 위한 framework다.

2. NextJs 장점

   - 앱에 있는 페이지들이 미리 redering된다. 이것들은 static하게 생성된다.

     1. 실제 HTML이 생성됨, JS가 없거나 인터넷이 느려도 HTML은 빠르게 볼 수있음.

   - Hydrate

     1. pre-rendering된 페이지를 client에게 보내고 나서 react가 번들링 된 JS코드들을 client에게 전송한다.

     2. 이 JS코드들이 이전에 보내진 HTML DOM element 위에서 re-rendering을 하면서 각자 자기 자리를 찾아가며 매칭이 된다.

     3. https://helloinyong.tistory.com/315

3. `package.json script` 정정

- 'dev' - 'next dev' 개발 모드에서 Next.js 를 시작하는 실행 / 핫 코드 리로딩 지원

- 'build' - 'next build' 프로덕션 용도로 애플리케이션을 빌드하는 실행

- 'start' - 'next start' Next.js 프로덕션 서버를 시작하는 실행 / 빌드된 Next application을 실행

<br>

## pages

1. 약속과 routing
   `pages` folder안에 route의 이름으로 파일을 생성하면 자동적으로 routing을 해준다.
   **따라서 파일의 이름이 중요하다.** 안에 함수 component의 이름은 중료하지 않다.
   또 `export default function`을 사용하지 않는다면 오류가 난다.
   이것들은 약속이다.

pages/about

```javascript
export default function someting() {
  return "hi";
}
```

로 작성하면 localhost:3000/about url이 자동적으로 생성되고 내용물은 hi다.

만약 pages에 없는 file의 url로 이동하게 된다면 자동적으로 404페이지를 만들어주고 띄워준다.
ex) about-us >> 404 error

2. index.js
   앱의 홈은 기본적으로 index.js를 사용한다.

3. jsx
   만약 jsx를 사용하고 있다면 react를 import할 필요가 없다.
   하지만 hook을 사용하기 위해서는 import를 사용해야한다.

4. `Link`
   next.js에서는 url이동을 위해, SPA를 위해 `<a>` tag를 사용하지 않는다.
   next.js에서 제공해주는 component인 `Link`를 사용한다.
   이것 안에 a tag를 두는 이유는 `Link`자체에 className이든 style 같은 것들을 줄 수 없기때문이다.

```javascript
        <Link href="/">
        <a>Home</a>
        </Link>
        <Link href="/about">
        <a >About</a>
        </Link>
```

## module.css

CSS 모듈이라는 패턴으로 우리가 일반적인 CSS를 사용할 수 있게 해준다.

페이지가 빌드될 때 Next가 클래스 이름을 무작위로 바꿔준다.
이것은 우리가 클래스 이름 충돌을 겪지 않도록 해준다.

1. 사용방법
   somthing.module.css 라고 css 파일이름을 짓고 사용하고 싶은 파일에서 `import styles from "./somthing.module.css";`를 해준다.

   `somthing`은 꼭 js의 파일이 아니어도 된다.

2. className
   여기에서 className은 예전처럼 쓰는 css에서 그대로 이름을 string으로 가져오는게 아니라 js를 이용해야한다.

   ```javascript
   import styles from "./somthing.module.css";
   <a className= {styles.link}>
   ```

   와 같이 사용하는데 만약 className을 두개 주고 싶다면 방법은 두가지가 존대한다.

   1. ``을 사용해서 두가지를 집어 넣는 방법
      `${styles.link} ${router.pathname === "/" ? styles.active : ""}`
   2. array를 만들어서 join을 하는 방법
      `[styles.link, router.pathname === "/about" ? styles.active : ""].join(" ")`
