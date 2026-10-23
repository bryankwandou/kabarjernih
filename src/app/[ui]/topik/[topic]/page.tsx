import type { Metadata } from "next";
import { Listing } from "@/components/Listing";
import { byTopic } from "@/lib/data";
import { TOPICS, UI, t, topicName, type Ui } from "@/lib/i18n";

export const dynamicParams = false;
export const generateStaticParams = () => UI.flatMap((ui) => TOPICS.map((topic) => ({ ui, topic })));

type P = { params: Promise<{ ui: Ui; topic: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { ui, topic } = await params;
  return { title: topicName(ui, topic) };
}

export default async function TopicPage({ params }: P) {
  const { ui, topic } = await params;
  return <Listing ui={ui} path={`topik/${topic}/`} current={topic} kicker={t(ui).topics} title={topicName(ui, topic)} items={byTopic(topic)} />;
}
