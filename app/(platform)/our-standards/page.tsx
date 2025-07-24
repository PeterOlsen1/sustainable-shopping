function Bullet({ header, text }: any) {
  return (
    <div>
      <div className="mb-6 text-2xl">{header}</div>
      <div>{text}</div>
    </div>
  );
}
export default function OurStandardsPage() {
  return (
    <div className="flex flex-col gap-8 mt-12 w-[90%] mx-auto">
      <div className="text-3xl" style={{ fontFamily: "Gruppo" }}>
        How we define sustainability
      </div>
      <div className="mb-2 mt-[-1em]">
        We ensure that all products we show that are labeled with the following
        meet these defined standards.
      </div>
      <Bullet
        header={"Durable / long-lasting"}
        text={
          "In the context of sustainability, durable, long-lasting products and materials are those designed and engineered to minimize the need for frequent replacements or repairs, thereby reducing resource consumption and waste generation. This concept is vital for a sustainable future, as it promotes responsible consumption, reduces environmental impact, and can drive innovation in design and material science."
        }
      />
      <Bullet
        header={"Less water consumption"}
        text={
          "Low water consumption, in the context of sustainability, means using water more efficiently and reducing overall water usage to conserve water resources and minimize environmental impact. It involves minimizing water waste and maximizing the effectiveness of water used for various purposes, from household activities to agricultural practices. "
        }
      />
      <Bullet
        header={"Ethically produced"}
        text={
          "Ethically produced, in the context of sustainability, means that products are made with a focus on fair labor practices, safe working conditions, and respect for human rights throughout the entire production process, from sourcing materials to manufacturing and distribution. It also implies a commitment to minimizing environmental impact and promoting transparency in the supply chain."
        }
      />
      <Bullet
        header={"Give back model"}
        text={
          "A give-back model in sustainability refers to business practices where companies integrate social and environmental considerations into their operations and decision-making, with the goal of creating positive impacts alongside profits. This approach moves beyond traditional corporate social responsibility (CSR) by embedding giving back into the core of the business model, rather than viewing it as a separate activity. "
        }
      />
      <Bullet
        header={"Organic Materials"}
        text={
          "Organic materials sustainability refers to the use of materials derived from living organisms (plants or animals) that are produced and managed in a way that minimizes environmental impact and promotes long-term ecological health. This includes practices like organic farming, which avoids synthetic pesticides and fertilizers, and using materials that are biodegradable or recyclable. "
        }
      />
      <Bullet
        header={"Recyclable"}
        text={
          'In the context of sustainability, "recyclable" means a material or product can be collected, processed, and transformed into new products, rather than being discarded as waste. It\'s a key part of reducing waste and conserving resources by keeping valuable materials in circulation.'
        }
      />
      <Bullet
        header={"Certified B Corp"}
        text={
          "A certified B Corporation (B Corp) is a for-profit company that has been certified by B Lab as meeting high standards of social and environmental performance, accountability, and transparency. These companies use business as a force for good, prioritizing people and the planet alongside profit. Learn more"
        }
      />
    </div>
  );
}
