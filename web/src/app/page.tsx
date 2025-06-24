import Link from "next/link";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Card from "@/components/Card";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>SARC em construção</h1>
      <Button>teste</Button>
      <Card> test</Card>
    </div>
  );
}
