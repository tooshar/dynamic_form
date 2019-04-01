import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as $ from "jquery";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private formBuilder: FormBuilder) {}
  analyticalForm: FormGroup;
  substances = ["API", "Cleaning Agent", "Bioburden", "Endotoxin"];
  selectedSubstance = "";
  isSwabSamplingConfig = false;
  isRinseSamplingConfig = false;
  isTNTC_TFTC_limits = true;
  submitted = false;

  ngOnInit() {
    this.analyticalForm = this.formBuilder.group({
      analytical_method_id: ["",  Validators.required],
      target_residue_type: ['', Validators.required],
      type_one: this.formBuilder.group({
        LOD: ['', Validators.required],
        LOQ: ['', Validators.required],
        swab_sampling_params: this.formBuilder.group({
          method_used: ['', Validators.required],
          solvent_name: ['', Validators.required],
          solvent_quantity: ['', Validators.required],
          default_recovery: ['', Validators.required],
        }),
        rinse_sampling_params: this.formBuilder.group({
          method_used: ['', Validators.required],
          default_recovery: ['', Validators.required],
        })
      }),
      type_two: this.formBuilder.group({
        method_used: ['', Validators.required],
        set_limits: this.formBuilder.group({
          TNTC: ['', Validators.required],
          TFTC: ['', Validators.required],
        }),
        swab_sampling_params: this.formBuilder.group({
          use_recovery_for_swab: ['', Validators.required],
          default_recovery: ['', Validators.required],
        }),
        rinse_sampling_params: this.formBuilder.group({
          solvent_volume: ['', Validators.required],
          use_recovery_for_swab: ['', Validators.required],
          default_recovery: ['', Validators.required],
        })
      }),
      reason: ['', Validators.required],
    });
  }

  get _form() { return this.analyticalForm.controls; }
  get _form_type_one() { return this.analyticalForm.controls.type_one.controls; }
  get _form_type_two() { return this.analyticalForm.controls.type_two.controls; }

  selectedSubstanceFunc(item) {
    this.selectedSubstance = item;
    this.analyticalForm.patchValue({target_residue_type: item});
    $("#dropdownMenuButton").val(item);

    this.isSwabSamplingConfig = false;
    this.isRinseSamplingConfig = false;
  }

  swabSamplingConfig() {
    this.isSwabSamplingConfig = !this.isSwabSamplingConfig;
  }

  rinseSamplingConfig() {
    this.isRinseSamplingConfig = !this.isRinseSamplingConfig;
  }

  isLimits(event) {
    this.isTNTC_TFTC_limits = event;
  }

  onSubmit() {
    this.submitted = true;
    setTimeout(() => {
      this.submitted = false;
    }, 1000);
    console.log(this.analyticalForm.value);
  }
}
