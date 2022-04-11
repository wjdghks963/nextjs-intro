# NextJS Intro

framework는 내가 코드를 적절한 위치에 정해진대로 작성하기만하면 나의 코드를 불러와서 동작을 시켜준다.
library는 내가 원하는 대로 코드를 작성하고 내가 사용하고 싶을때 사용한다.

1. NextJs란

SSR, 파일 기반 라우팅, 풀스택 빌드 구현을 위한 framework다.

2. NextJs 장점

   - 앱에 있는 페이지들이 미리 redering된다. 이것들은 static하게 생성된다. (SSR)

     1. 실제 HTML이 생성됨, JS가 없거나 인터넷이 느려도 HTML은 빠르게 볼 수있음.

   - Hydrate

     1. pre-rendering된 페이지를 client에게 보내고 나서 react가 번들링 된 JS코드들을 client에게 전송한다.

     2. 이 JS코드들이 이전에 보내진 HTML DOM element 위에서 re-rendering을 하면서 각자 자기 자리를 찾아가며 매칭이 된다.

     3. https://helloinyong.tistory.com/315

3. `package.json script` 정정

- 'dev' - 'next dev' 개발 모드에서 Next.js 를 시작하는 실행 / 핫 코드 리로딩 지원

- 'build' - 'next build' 프로덕션 용도로 애플리케이션을 빌드하는 실행

- 'start' - 'next start' Next.js 프로덕션 서버를 시작하는 실행 / 빌드된 Next application을 실행

4. next.js 를 실행하는 명령어

```javascript
npm run dev
```

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

5. nesting routes(중접되는 라우츠)를 사용해야하면 어떻게 해야할까

   만약에 내가 route를 구성할때 `/movies` 와 `/mmovies/all`과 같이 사용해야할 때가 왔다고 가정한다.
   그러면 pages의 구성을 어떻게 해야할까

   > nesting을 시작하는 이름으로 folder를 만들고 그 안에 파일을 만든다.
   > 폴더의 구성요소를 다음과 같게 한다.
   > /pages/moives/index.js
   > /pages/moives/all.js

6. 그럼 CRA의 react-router-dom에서 사용하는 `:id`와 같이 변수를 이용하는 Dynamic URL을 이용하고 싶을 떈 어떻게 해야할까

   [id].js 파일을 만든다.
   대괄호에 들어가는 변수명은 여기서도 마찬가지로 내가 설정한다.

   id는 어떻게 받을까 next 내장 함수인 useRouter를 이용한다.
   [id].js

   ```javascript
   import { useRouter } from "next/router";

   export default function Detial() {
     const router = useRouter();
     return;
   }
   ```

7. next에서 주는 router
   `router`에는 많은 메서드가 내장되어 있으며 보통 url에 query를 담아 이동시킬때 `push`를 사용한다.
   만약 이 query를 담은 Link를 이용해 url을 이동하지 않고 직접적으로 외부에서 자원이 필요한 페이지로 이동할땐 데이터를 받아 올 수 없다.
   외부 뿐만 아니라 같은 페이지에 있는 query를 가지고 있지 않고 이동시키는 Link들도 마찬가지다.
   <br>

# Style

## module.css

우리가 원래 사용하던 방식으로 page나 component에 css를 import할 수 없기때문에 CSS 모듈이라는 패턴으로 우리가 일반적인 CSS를 사용할 수 있게 해준다.

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

1.  ``을 사용해서 두가지를 집어 넣는 방법 `${styles.link} ${router.pathname === "/" ? styles.active : ""}`
2.  array를 만들어서 join을 하는 방법
    `[styles.link, router.pathname === "/about" ? styles.active : ""].join(" ")`

## Style JSX

next js의 고유의 스타일링이라 할 정도로 다른것들은 사용할때 잘 사용하지 않는다.

_완전 독립적이라 부모 컴포넌트가 자식 컴포넌트의 클래스 이름을 사용하고 있더라도 상관이 없다._

클래스 이름을 붙혀주면 자동적으로 뒤에 새로운 클래스 이름을 또 붙여줘 자동적으로 유니크하게 만들어준다.

1. 사용방법
   일반 JSX파일에 <style>태그를 넣는다.

```javascript
<style jsx>{`
  nav {
    background-color: tomato;
  }
  a {
    text-decoration: none;
  }
`}</style>
```

2. global
   부모 컴포넌트에서 자식 컴포넌트에게 스타일을 주더라도 받지 않고 자기가 가지고 있는 스타일 만을 사용하는데 이걸 주기 위해서는 global이라는 props를 사용한다.

   부모 컴포넌트에게 `<style jsx global>`을 사용하면 같은 클래스 이름을 갖고 있는 클래스에게 스타일을 물려줄 수 있다.

# App Component (Custom App Component)

컴포넌트의 청사진이라 할 수 있다.
어떻게 페이지가 있어야 하는지, 어떤 컴포넌트가 어떤 페이지에 있어야 하는지...

파일명은 무조건 `_app.js`으로 이름이 정해져있다.

rendering이 되기전에 `_app.js`를 보고난 후에 pages 폴더의 내용물들을 하나하나 보고 rendering하고 다시 `_app.js`를 보고 다음 pages의 파일을 보고 rendering하고 ... 이런 식으로 rendering을 해준다.

기본적으로 App은 아래와 같이 보이는 상태이다.

```javascript
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

여기서는 일반적인 css파일인 global.css를 import할 수 있다.

1. 정의
   \_app은 서버로 요청이 들어왔을 때 가장 먼저 실행되는 컴포넌트로 페이지에 적용할 공통 레이아웃 역할을 한다.

2. 기능

   - 페이지들이 변화할 때 레이아웃 유지
   - 페이지를 navigating(탐색)할 때 state 유지
   - `componentDidCath`로 사용자 에러 관리
   - 페이지들에 추가데이터 사용(주입)가능
   - 글로벌 CSS 추가

3. Component와 pageProps는 뭘까?

   ```javascript
   console.log(Component);
   console.log(pageProps);
   ```

   위와 같은 `console.log`를 찍는다면

   1. Component는 현재 내가 위치해 있는 component의 함수를 리턴해준다. 이 함수는 내가 위치가 바뀔때마다 바뀐다.

   2. pageProps는 Object를 반환한다.
      공식 문서 설명 : pageProps is an object with the initial props that were preloaded for your page by one of our data fetching methods, otherwise it's an empty object.

# next에서 제공하는 기능

head관리 부분과 같이 만약 react를 사용한다면 react-helmet부터 다른 설정, 코드들을 만들어야하는데 next에서 제공해주는 작은 패키지들이 존재해 이런것들을 그냥 공짜로 제공받아 사용할 수 있다.

ex) next/head

```javascript
import Head from "next/head";

export default function Seo({ title }) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
```

# next.config.js

Next.js에서 커스텀 설정을 하기 위해서는 프로젝트 디렉터리의 루트(package.json 옆)에 next.config.js 또는 next.config.mjs 파일을 만들어서 사용한다.
next.config.js는 JSON 파일이 아닌 일반 Node.js 모듈이며 Next.js 서버 및 빌드 단계에서 사용되며 브라우저 빌드에는 포함되지 않는다.

https://nextjs.org/docs/api-reference/next.config.js/introduction

```javascript
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
      {
        source: "/old-post/:path*",
        destination: "/new-sexy-post/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};
```

1. redirects
   들어오는 요청 경로를 다른 대상 경로로 redirection할 수 있다.

- `source` : 들어오는 요청 경로
- `destination` : redirect할 경로
- `permanent` : 검색 엔진에 redirection을 영구적으로 cache하도록 지시함 값은 boolean

ex) 만약 /post로 유저가 들어간다면 /으로 보내고 싶다

```javascript
async redirects() {
   return [
      {
         source: "/post",
         descrionation :"/",
         permanent :false
      }
   ]
}
```

2. rewrites
   들어오는 요청 경로를 다른 대상 경로로 매핑할 수 있다.

   URL 프록시 역할을 하고 대상 경로를 마스킹하여 사용자가 사이트에서 위치를 변경하지 않은 것처럼 보이게한다.
   반대로 리디렉션은 새 페이지로 다시 라우팅되고 URL 변경 사항을 표시한다.

- `source` : 들어오는 요청 경로
- `destination` : route할 경로

destination의 경로를 불러오며 url은 source에 해당하는 경로를 유지한다(masking).

# SSR

## getServerSideProps()

getServerSideProps는 server에서 실행되며 브라우저에서는 실행되지 않는다.
Next.js는 getServerSideProps에서 반환된 데이터를 사용하여 각 request에서 이 페이지를 pre-render한다.
무엇을 return하던 props로서 page에게 주게된다.

> 이게 무슨 뜻이냐
> 우리가 \_app.js에서 사용했던 코드를 보면 Component, pageProps가 있었다.

```javascript
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

> 위에서 Component는 내가 렌더링하는 component이며 pageProps가 `getSeverSideProps`에서 return한 props로서 들어간다.
> 즉 props를 전달하는 함수에서는 꼭! export를 해야하며 받는 compoenent는 인자로서 꼭! 전달받아야한다.

```javascript
export default function Home({results}){...}
```

이것은 데이터가 받아오기 전까지 빈화면을 보여준다. 이 함수 안에서 fetch는 프론트를 이용한 경로를 모르기 때문에 절대경로를 이용한다.

```javascript
export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000//api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
```
