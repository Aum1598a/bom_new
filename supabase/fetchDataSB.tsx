'use client'
import { supabase } from './supabaseConnect';

export const FetchItemWithMaster = async (masterNewModelName: string) => {
  let { data, error } = await supabase
    .rpc('get_bomdata'
      , {
        master_value: masterNewModelName ? masterNewModelName : undefined
      }
    )

  if (error) console.error(error)
  else {
    console.log('Fetched data Item:', data);
    return data || [];
  }

};

export const FetchBomNewModel = async (master_value: string) => {
  console.log('master_value', master_value);

  let { data, error } = await supabase
    .rpc('get_bomdata_new_model', {
      master_value
    })
  if (error) console.error('Error FetchBomNewModel =>', error)
  else {
    console.log('Success FetchBomNewModel => ', data);
    return data || [];
  }

};

export const FetchMaster = async (masterNewModelName: string) => {
  let { data, error } = await supabase
    .from('masterItem')
    .select()
    .filter('status', 'ilike', 'New model')
    .filter('master_item', 'ilike', `%${masterNewModelName}%`)
  if (error) {
    console.error('Error FetchMaster => ', error.message);
    return [];
  } else {
    console.log('Success FetchMaster => ', data);
    return data || [];
  }
};

export const Fetchtest = async () => {
  let { data, error } = await supabase
    .from('masterItem')
    .select(`
    id_masterItem,
    bomdata_v1 (
      master_item
    )
`)
  if (error) {
    console.error('Error fetching data Item:', error.message);
    return [];
  } else {
    console.log('Success data Item:', data);
    return data || [];
  }
};


export const FetchMasterItem = async (valueFilter: string[]) => {
  let { data, error } = await supabase
    .from('masterItem')
    .select('*')
    .in('id_masterItem', valueFilter)

  if (error) {
    console.error('Error FetchMasterItem =>', error.message);
    return [];
  } else {
    console.log('Success FetchMasterItem => :', data);
    return data || [];
  }
};

export const FetchBomdata_v1 = async (searchTerm: string) => {
  console.log(searchTerm);

  let { data, error } = await supabase
    .from('bomdata_v1')
    .select(`*`)
    .filter('master_item', 'ilike', `${searchTerm}`)
    .filter('status_item', 'ilike', 'latest')
  if (error) {
    console.error('Error FetchBomdata_v1 => ', error.message);
    return [];
  } else {
    console.log('Success FetchBomdata_v1 =>', data);
    return data || [];
  }
};

export const FetchFilterItem = async (filterItem: any[]) => {
  console.log('filterItem', filterItem);

  let { data, error } = await supabase
    .from('itemtit')
    .select(`*`)
    .filter('id_item', 'in', filterItem)

  if (error) {
    console.error('Error FetchFilterItem => ', error.message);
    return [];
  } else {
    console.log('Success FetchFilterItem =>', data);
    return data || [];
  }
};

export const FetchItem = async (Itemtit: string) => {
  let { data, error } = await supabase
    .from('itemtit')
    .select('*')
    .range(0, 19)
    .filter('id_item', 'ilike', `%${Itemtit}%`);

  if (error) {
    console.error('Error FetchItem => ', error.message);
    return [];
  } else {
    console.log('Success FetchItem d =>', data);
    return data || [];
  }
};

export const FetchRevisDivision = async (itemMaster: string) => {
  console.log('itemMaster', itemMaster);

  let { data, error } = await supabase
    .from('revis_division')
    .select('*')
    .filter('id_parent', 'ilike', `${itemMaster}`);
  if (error) {
    console.error('Error FetchRevisDivision => ', error.message);
    return [];
  } else {
    console.log('Success FetchRevisDivision =>', data);
    return data || [];
  }
};

export const FetchWO = async (dateString: string) => {
  let { data, error } = await supabase
    .from('testwo')
    .select("*")
    .eq('Release_date', dateString)
    .filter('Remarks', 'ilike', `%TEST%`)
    .filter('WO_status', 'ilike', `R`);
  // .in('Item_number', )
  if (error) {
    console.error('Error FetchWO => ', error.message);
    return [];
  } else {
    console.log('Success FetchWO =>', data);
    return data || [];
  }
}

export const FetchWorktest = async (idwork: any[]) => {
  let { data, error } = await supabase
    .from('worktest')
    .select("*")
    .in('id_worktest', idwork)
  if (error) {
    console.error('Error FetchWorktest => ', error.message);
    return [];
  } else {
    console.log('Success FetchWorktest =>', data);
    return data || [];
  }
}

interface WorktestItem {
  id_item_number: string;
  id_worktest: string;
}

export const FetchWorktestJoinBom = async (idwork: any[]) => {

  let { data, error } = await supabase
    .from('worktest')
    .select('*')
    .filter('status_worktest', 'ilike', `NO`)
    .filter('item_number', 'ilike', `%${idwork}%`)
    .range(0, 99)

  if (error) {
    console.error('Error FetchWorktestJoinBom => ', error.message);
    return [];
  } else if (data) {
    console.log('Success FetchWorktestJoinBom =>', data);
    return data || [];
  }
}


export const FetchitemTIT = async (itemd: string[]) => {
  let { data, error } = await supabase
    .rpc('search_item_tit', {
      item: itemd
    })

  if (error) {
    console.error('Error search_item_tit => ', error.message);
    return [];
  } else {
    console.log('Success search_item_tit =>', data);
    return data || [];
  }

}

export const FetchBomdata = async (searchTerm: string) => {
  let { data, error } = await supabase
    .from('bomdata_v1')
    .select(`*`)
    .filter('master_item', 'ilike', `%${searchTerm}%`)

  if (error) {
    console.error('Error FetchBomdata => ', error.message);
    return [];
  } else {
    console.log('Success FetchBomdata =>', data);
    return data || [];
  }
};

export const Get_data_masterItem = async (text: string[]) => {
  let { data, error } = await supabase
    .from('masterItem')
    .select("*")
    .in('column', text)

  if (error) {
    console.error('Error Get_data_masterItem => ', error.message);
    return [];
  } else {
    console.log('Success Get_data_masterItem =>', data);
    return data || [];
  }
}

export const Get_test = async () => {

  let { data, error } = await supabase
    .from('test_prisma')
    .select('id')


  if (error) {
    console.error('Error Get_test => ', error.message);
    return [];
  } else {
    console.log('Success Get_test =>', data);
    return data || [];
  }

}

export const FetchSearchItem = async () => {
  let { data, error } = await supabase
    .rpc('search_item')

  if (error) {
    console.error('Error FetchSearchItem => ', error.message);
    return [];
  } else {
    console.log('Success FetchSearchItem =>', data);
    return data || [];
  }


}

export const FetchDocxWorktest = async () => {
  let { data, error } = await supabase
    .from('worktest')
    .select('id_worktest ,item_number,docx_test,status_test,prod_area,prod_unit,release')
    .order('release', { ascending: false });
  if (error) {
    console.error('Error FetchSearchItem => ', error.message);
    return [];
  } else {
    console.log('Success FetchSearchItem =>', data);
    return data || [];
  }


}

export const FetchDocxRelation = async () => {
  let { data, error } = await supabase
    .rpc('search_eco')
  if (error) {
    console.error('Error FetchDocxRelation => ', error.message);
    return [];
  } else {
    console.log('Success FetchDocxRelation => ', data);
    return data || [];

  }
}

export const FetchStructureItem = async () => {
  let { data, error } = await supabase
    .rpc('search_structure_item')

  if (error) {
    console.error('Error FetchStructureItem => ', error.message);
    return [];
  } else {
    console.log('Success FetchStructureItem => ', data);
    return data || [];

  }
}

export const Fetchsearch_item_with_address = async () => {
  let { data, error } = await supabase
    .rpc('search_item_with_address')
  if (error) {
    console.error('Error FetchStructureItem => ', error.message);
    return [];
  } else {
    console.log('Success FetchStructureItem => ', data);
    return data || [];

  }
}


export const Fetchget_bom_new = async (master_value: string) => {
  let { data, error } = await supabase
    .rpc('get_bom_new', {
      master_value
    })

  if (error) {
    console.error('Error Fetchget_bom_new => ', error.message);
    return [];
  } else {
    console.log('Success Fetchget_bom_new => ', data);
    return data || [];

  }
}
export const FetchBomdata_v2 = async (searchTerm: string) => {
  console.log(searchTerm);
  let { data, error } = await supabase
    .from('bomdata_v2')
    .select(`*`)
    .filter('master_item', 'ilike', `${searchTerm}`)
  if (error) {
    console.error('Error FetchBomdata_v1Master => ', error.message);
    return [];
  } else {
    console.log('Success FetchBomdata_v1Master =>', data);
    return data || [];
  }
};

export const Fetch_set_carton_box = async () => {
  let { data, error } = await supabase
    .rpc('search_set_carton_box')

  if (error) {
    console.error('Error Fetch_set_carton_box => ', error.message);
    return [];
  } else {
    console.log('Success Fetch_set_carton_box');
    return data || [];
  }
};

export const Fetch_pack = async () => {
  let { data, error } = await supabase
    .from('pack_std')
    .select('*')
    if (error) {
      console.error('Error Fetch_pack => ', error.message);
      return [];
    } else {
      console.log('Success Fetch_pack');
      return data || [];
    }

}
