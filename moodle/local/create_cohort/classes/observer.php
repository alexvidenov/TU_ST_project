<?php

class local_create_cohort
{
    public static function create_cohort(\core\event\user_updated $event)
    {
        // // Check if the cohort has changed
        // $previous_cohort = $event->ge('cohort');
        // $new_cohort = $event->get_new_data('cohort');

        // if ($previous_cohort !== $new_cohort) {
        //     // Cohort has changed, let's create a new cohort
        //     create_new_cohort($event->objectid, $new_cohort);
        // }
        echo "<pre>";
        var_dump($event);
        echo "<pre>";
    }

    public function create_new_cohort($user_id, $cohort_id)
    {
        global $DB;

        // Check if the cohort already exists
        $existing_cohort = $DB->get_record('cohort', array('id' => $cohort_id));

        if (!$existing_cohort) {
            // Get user information
            $user = $DB->get_record('user', array('id' => $user_id));

            // Create a new cohort
            $new_cohort = new stdClass();
            $new_cohort->name = 'New Cohort - ' . $user->username;
            $new_cohort->id = $DB->insert_record('cohort', $new_cohort);

            // Add the user to the new cohort
            cohort_add_member($new_cohort->id, $user_id);
        }
    }
}
