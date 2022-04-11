import { useRouter } from "next/router";
import Seo from "../../components/Seo";

export default function Detial({ params }) {
  const router = useRouter();
  // ~ || [] 를 하는 이유 :
  const [title, id] = params || [];

  console.log(router);
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: { params },
  };
}
