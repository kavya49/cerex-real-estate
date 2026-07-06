import { Module } from "@nestjs/common";
import { DecisionEngineController } from "./decision-engine.controller";
import { DecisionEngineService } from "./decision-engine.service";
import { FactBuilderService } from "./fact-builder/fact-builder.service";
import { RuleEngineService } from "./rule-engine/rule-engine.service";
import { AttributeBuilderService } from "./attribute-builder/attribute-builder.service";
import { PriorityEngineService } from "./priority-engine/priority-engine.service";
import { ConstraintEngineService } from "./constraint-engine/constraint-engine.service";

@Module({
  controllers: [DecisionEngineController],
  providers: [
    DecisionEngineService,
    FactBuilderService,
    RuleEngineService,
    AttributeBuilderService,
    PriorityEngineService,
    ConstraintEngineService,
  ],
  exports: [DecisionEngineService],
})
export class DecisionEngineModule {}
