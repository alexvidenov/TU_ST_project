<?php

class local_remote_sync_observer
{
    public static function remote_sync(\core\event\user_created $event)
    {
        $event_data = $event->get_data();
        error_log("in observer");
    }
}
