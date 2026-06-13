import { Button } from "@/shared/components/ui/button";
import ListItem from "@/shared/components/ui/list-item";
import Subtitle from "@/shared/components/ui/subtitle";
import TextList from "@/shared/components/ui/text-list";
import Title from "@/shared/components/ui/title";

export default function AuthPage() {
  return (
    <>
      <Title>Event Space ZP</Title>

      <div className="space-y-3">
        <div>
          <Subtitle>The purpose</Subtitle>

          <TextList>
            <ListItem>
              Raise the awareness about public events in Zaporizhzhia
            </ListItem>
            <ListItem>
              Bring students and young people together to socialize and
              collaborate
            </ListItem>
            <ListItem>Provide a convenient way to sign up to events</ListItem>
          </TextList>
        </div>

        <div>
          <Subtitle>The author</Subtitle>

          <TextList>
            <ListItem>Ihor Antiukhov</ListItem>
            <ListItem>
              A student at National University &quot;Zaporizhzhia
              Polytechnic&quot;
            </ListItem>
            <ListItem>Full-Stack developer (Next.js + Node.js)</ListItem>
          </TextList>
        </div>

        <Button variant="default" size="lg" className="w-full">
          Get Started
        </Button>
      </div>
    </>
  );
}
