<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompetitionAnswer extends Model {

    protected $table = 'tb_competition_answer';
    protected $guarded = ['id'];
    public  $timestamps = false;

    static public  function isDelete($id){
        return true;
    }

    
}
