export interface DateDataTypeValidation {
  /**
   * date must be before max date
   */
  max?: string;
  /**
   * date must be after max date
   */
  min?: string;

  isNotEmpty?: boolean;
}
